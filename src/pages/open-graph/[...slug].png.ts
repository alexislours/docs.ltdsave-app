import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const docs = await getCollection('docs');
const pages = Object.fromEntries(docs.map(({ id, data }) => [id, data]));

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'slug',
  pages,
  getSlug: (path) => path || 'index',
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description ?? 'docs.ltdsave.app',
    bgGradient: [
      [10, 10, 12],
      [28, 18, 10],
    ],
    border: { color: [234, 88, 12], width: 16, side: 'block-end' },
    padding: 80,
    logo: { path: './src/assets/logo.svg', size: [120, 124] },
    font: {
      title: {
        color: [250, 250, 250],
        size: 76,
        weight: 'ExtraBold',
        lineHeight: 1.1,
        families: ['Inter'],
      },
      description: {
        color: [253, 186, 116],
        size: 30,
        weight: 'Medium',
        lineHeight: 1.4,
        families: ['Inter'],
      },
    },
    fonts: [
      'https://api.fontsource.org/v1/fonts/inter/latin-500-normal.ttf',
      'https://api.fontsource.org/v1/fonts/inter/latin-800-normal.ttf',
    ],
  }),
});
