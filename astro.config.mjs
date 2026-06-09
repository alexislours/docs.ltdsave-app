// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import astroD2 from 'astro-d2';
import savReferenceSidebar from './src/data/sidebar-save-reference.ts';

export default defineConfig({
  site: 'https://docs.ltdsave.app',
  integrations: [
    astroD2(),
    starlight({
      title: 'ltdsave.app docs',
      description:
        'Documentation for ltdsave.app - the in-browser save editor for Nintendo Tomodachi Life: Living the Dream.',
      logo: { src: './src/assets/logo.svg' },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/overrides/Head.astro',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/alexislours/docs.ltdsave-app',
        },
      ],
      plugins: [
        starlightSidebarTopics(
          [
            {
              label: 'Using ltdsave.app',
              link: '/using/overview/',
              icon: 'laptop',
              items: [
                { label: 'Overview', slug: 'using/overview' },
                {
                  label: 'Getting your save files',
                  items: [
                    { label: 'Ryujinx', slug: 'using/saves/ryujinx' },
                    { label: 'Eden', slug: 'using/saves/eden' },
                    { label: 'Modded Switch', slug: 'using/saves/switch' },
                  ],
                },
                {
                  label: 'Using the editor',
                  items: [
                    { label: 'Loading saves', slug: 'using/editor/loading' },
                    { label: 'Player tab', slug: 'using/editor/player' },
                    { label: 'Mii tab', slug: 'using/editor/mii' },
                    { label: 'Map tab', slug: 'using/editor/map' },
                    { label: 'UGC tab', slug: 'using/editor/ugc' },
                    { label: 'ShareMii tab', slug: 'using/editor/sharemii' },
                  ],
                },
                { label: 'FAQ', slug: 'using/faq' },
              ],
            },
            {
              id: 'save-reference',
              label: 'Save file reference',
              link: '/save-reference/',
              icon: 'document',
              items: [
                { label: 'Overview', slug: 'save-reference' },
                { label: 'Container layout', slug: 'save-reference/container' },
                { label: 'Hash', slug: 'save-reference/hash' },
                { label: 'Glossary', slug: 'save-reference/glossary' },
                { label: 'Data types', slug: 'save-reference/data-types' },
                { label: 'Enums', slug: 'save-reference/enums' },
                { label: 'Documentation coverage', slug: 'save-reference/coverage' },
                ...savReferenceSidebar,
              ],
            },
            {
              label: 'Misc',
              link: '/misc/',
              icon: 'open-book',
              items: [
                { label: 'Overview', slug: 'misc' },
                {
                  label: 'Game mechanics',
                  items: [
                    { label: 'Proposal system', slug: 'mechanics/proposal' },
                    {
                      label: 'Coin Spin minigame',
                      slug: 'mechanics/coin-turn-minigame',
                    },
                    { label: 'Food taste', slug: 'mechanics/food-taste' },
                  ],
                },
                {
                  label: 'Misc',
                  items: [{ label: 'Why no >70 Mii mod?', slug: 'q/70' }],
                },
              ],
            },
          ],
          {
            exclude: ['/'],
            topics: {
              'save-reference': ['/save-reference/enums/**'],
            },
          },
        ),
        starlightLinksValidator({ errorOnRelativeLinks: false }),
        starlightImageZoom(),
      ],
    }),
  ],
});
