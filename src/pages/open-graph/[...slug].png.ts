import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CanvasKit, FontWeightEnumValues, Image, Paragraph } from 'canvaskit-wasm';
import { Buffer } from 'node:buffer';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { decodeHTMLStrict } from 'entities';

const { resolve } = createRequire(import.meta.url);

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 80;

const FONTS = [
  'https://api.fontsource.org/v1/fonts/inter/latin-500-normal.ttf',
  'https://api.fontsource.org/v1/fonts/inter/latin-800-normal.ttf',
  'https://api.fontsource.org/v1/fonts/inter/latin-900-normal.ttf',
];

const BG_IMAGE_PATH = './src/assets/og/og-background.png';

const EYEBROW_SIZE = 30;
const EYEBROW_LINE_HEIGHT = 1;
const EYEBROW_GAP = 28;
const TITLE_SIZE = 78;
const TITLE_LINE_HEIGHT = 1.08;
const TITLE_GAP = 28;
const DESC_SIZE = 30;
const DESC_LINE_HEIGHT = 1.4;

type RGB = [number, number, number];
const EYEBROW_COLOR: RGB = [154, 52, 18];
const TITLE_COLOR: RGB = [15, 23, 42];
const DESC_COLOR: RGB = [51, 65, 85];

let canvasKitPromise: Promise<CanvasKit> | undefined;
async function getCanvasKit() {
  if (!canvasKitPromise) {
    canvasKitPromise = (async () => {
      const { default: init } = await import('canvaskit-wasm/full');
      return init({
        locateFile: (file: string) => resolve(`canvaskit-wasm/bin/full/${file}`),
      });
    })();
  }
  return canvasKitPromise;
}

let fontDataPromise: Promise<ArrayBuffer[]> | undefined;
async function getFontData() {
  if (!fontDataPromise) {
    fontDataPromise = Promise.all(
      FONTS.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch font: ${url}`);
        return res.arrayBuffer();
      }),
    );
  }
  return fontDataPromise;
}

let bgBufferPromise: Promise<Buffer> | undefined;
async function getBgBuffer() {
  if (!bgBufferPromise) {
    bgBufferPromise = fs.readFile(path.resolve(BG_IMAGE_PATH));
  }
  return bgBufferPromise;
}

function eyebrowFor(slug: string): 'Reference' | 'Guide' {
  if (slug === 'save-reference' || slug.startsWith('save-reference/')) return 'Reference';
  return 'Guide';
}

async function renderOG(slug: string, title: string, description: string) {
  const CanvasKit = await getCanvasKit();
  const fontData = await getFontData();
  const fontMgr = CanvasKit.FontMgr.FromData(...fontData);
  if (!fontMgr) throw new Error('Failed to create font manager');

  const surface = CanvasKit.MakeSurface(WIDTH, HEIGHT);
  if (!surface) {
    fontMgr.delete();
    throw new Error('Failed to create surface');
  }

  const paragraphs: Paragraph[] = [];
  let image: Image | undefined;

  try {
    const canvas = surface.getCanvas();

    const bgPaint = new CanvasKit.Paint();
    bgPaint.setColor(CanvasKit.Color(255, 251, 235));
    canvas.drawRect(CanvasKit.XYWHRect(0, 0, WIDTH, HEIGHT), bgPaint);
    bgPaint.delete();

    const bgBuf = await getBgBuffer();
    const bgImg = CanvasKit.MakeImageFromEncoded(bgBuf);
    if (bgImg) {
      const bgW = bgImg.width();
      const bgH = bgImg.height();
      const ratio = bgW / WIDTH < bgH / HEIGHT ? WIDTH / bgW : HEIGHT / bgH;
      const targetW = bgW * ratio;
      const targetH = bgH * ratio;
      const targetX = (WIDTH - targetW) / 2;
      const targetY = (HEIGHT - targetH) / 2;
      const imgPaint = new CanvasKit.Paint();
      canvas.drawImageRect(
        bgImg,
        CanvasKit.XYWHRect(0, 0, bgW, bgH),
        CanvasKit.XYWHRect(targetX, targetY, targetW, targetH),
        imgPaint,
      );
      imgPaint.delete();
      bgImg.delete();
    }

    const maxWidth = WIDTH - PADDING * 2;

    const makeParagraph = (
      text: string,
      color: RGB,
      size: number,
      weight: Exclude<keyof FontWeightEnumValues, 'values'>,
      lineHeight: number,
    ) => {
      const style = new CanvasKit.ParagraphStyle({
        textAlign: CanvasKit.TextAlign.Left,
        textStyle: {
          color: CanvasKit.Color(...color),
          fontFamilies: ['Inter'],
          fontSize: size,
          fontStyle: { weight: CanvasKit.FontWeight[weight] },
          heightMultiplier: lineHeight,
        },
        textDirection: CanvasKit.TextDirection.LTR,
      });
      const builder = CanvasKit.ParagraphBuilder.Make(style, fontMgr);
      builder.addText(decodeHTMLStrict(text));
      const para = builder.build();
      para.layout(maxWidth);
      builder.delete();
      paragraphs.push(para);
      return para;
    };

    const eyebrowPara = makeParagraph(
      `• ${eyebrowFor(slug)}`,
      EYEBROW_COLOR,
      EYEBROW_SIZE,
      'ExtraBold',
      EYEBROW_LINE_HEIGHT,
    );
    const titlePara = makeParagraph(title, TITLE_COLOR, TITLE_SIZE, 'Black', TITLE_LINE_HEIGHT);
    const descPara = description
      ? makeParagraph(description, DESC_COLOR, DESC_SIZE, 'Medium', DESC_LINE_HEIGHT)
      : undefined;

    let y = PADDING;
    canvas.drawParagraph(eyebrowPara, PADDING, y);
    y += eyebrowPara.getHeight() + EYEBROW_GAP;
    canvas.drawParagraph(titlePara, PADDING, y);
    y += titlePara.getHeight() + TITLE_GAP;
    if (descPara) canvas.drawParagraph(descPara, PADDING, y);

    image = surface.makeImageSnapshot();
    const bytes = image.encodeToBytes(CanvasKit.ImageFormat.PNG);
    if (!bytes) throw new Error('Failed to encode OG image to PNG');

    return Buffer.from(bytes);
  } finally {
    for (const p of paragraphs) p.delete();
    image?.delete();
    fontMgr.delete();
    surface.delete();
  }
}

const docs = await getCollection('docs');

type Props = {
  slug: string;
  title: string;
  description: string;
};

export async function getStaticPaths() {
  return docs.map((entry) => {
    const slug = entry.id || 'index';
    return {
      params: { slug },
      props: {
        slug,
        title: entry.data.title,
        description: entry.data.description ?? 'docs.ltdsave.app',
      } satisfies Props,
    };
  });
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { slug, title, description } = props;
  const buffer = await renderOG(slug, title, description);
  return new Response(buffer, {
    headers: { 'Content-Type': 'image/png' },
  });
};
