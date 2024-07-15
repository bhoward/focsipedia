// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkCodeImport from 'remark-code-import';
import rehypeGraphviz from '@beoe/rehype-graphviz';

const katexOptions = {
  macros: {
    "\\T": "\\mathbb{T}",
    "\\F": "\\mathbb{F}",
  },
};

const codeImportOptions = {
  removeRedundantIndentations: true,
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FoCSipedia',
  tagline: 'Foundations of Computation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bhoward.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/focsipedia/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bhoward', // Usually your GitHub org/user name.
  projectName: 'focsipedia', // Usually your repo name.

  onBrokenLinks: 'warn', // was 'throw'
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'focsipedia-docs/target/mdoc',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/bhoward/focsipedia/tree/master/',
          remarkPlugins: [remarkMath, [remarkCodeImport, codeImportOptions]],
          rehypePlugins: [[rehypeKatex, katexOptions], rehypeGraphviz],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/bhoward/focsipedia/tree/master/',
            remarkPlugins: [remarkMath, [remarkCodeImport, codeImportOptions]],
            rehypePlugins: [[rehypeKatex, katexOptions], rehypeGraphviz],
          },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn', // from srihash.org
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO Replace with your project's social card
      image: 'img/focsipedia-social-card.jpg',
      navbar: {
        title: 'FoCSipedia',
        logo: {
          alt: 'Smart Fox Logo',
          src: 'img/SmartFoxIcon.jpeg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {to: '/docs/236topics', label: 'Topics', position: 'left'},
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/bhoward/focsipedia/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Policies',
                to: '/docs/policies',
              },
              {
                label: 'Attribution',
                to: '/docs/attribution',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/bhoward/focsipedia/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/bhoward">Brian T. Howard</a>. Built with Docusaurus. <a href="https://purl.org/focsipedia">FoCSipedia</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt=""></a>`,
      },
      algolia: {
        apiKey: '98e3a58877cfcccd391a5303d86a9c61', // ggignore
        appId: 'YNUYSORFOS',
        indexName: 'focsipedia',
        searchPagePath: false,
        searchParameters: {
          queryLanguages: ['en'],
          ignorePlurals: true,
        }, // Optional, if provided by Algolia
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['clike', 'java', 'scala'],
      },
    }),

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
