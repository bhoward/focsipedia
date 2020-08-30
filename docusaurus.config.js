const math = require('remark-math');
const katex = [require('rehype-katex'), {
  macros: {
    "\\T": "\\mathbb{T}",
    "\\F": "\\mathbb{F}",
  },
}];
const customBlocks = [require('remark-custom-blocks'), {
  spoiler: {
    classes: 'spoiler-block',
    title: 'optional',
    details: true,
  },
}];
const gridTables = require('remark-grid-tables');

module.exports = {
  title: 'FoCSipedia',
  tagline: 'Foundations of Computation',
  url: 'https://bhoward.github.io/',
  baseUrl: '/focsipedia/',
  favicon: 'img/favicon.ico',
  organizationName: 'bhoward', // Usually your GitHub org/user name.
  projectName: 'focsipedia', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'FoCSipedia',
      logo: {
        alt: 'Smart Fox Logo',
        src: 'img/SmartFoxIcon.jpeg',
      },
      links: [
        {to: 'docs/topics', label: 'Topics', position: 'left'},
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/bhoward/focsipedia',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: { // TODO
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Policies',
              to: 'docs/policies',
            },
            {
              label: 'Style Guide',
              to: 'docs/styleGuide',
            },
            {
              label: 'Attribution',
              to: 'docs/attribution',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/bhoward/focsipedia',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/BrnHwrd',
            },
          ],
        },
        // {
        //   title: 'Blog Feed',
        //   items: [
        //     {
        //       label: 'RSS',
        //       to: 'blog/rss.xml',
        //     },
        //     {
        //       label: 'Atom',
        //       to: 'blog/atom.xml',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Brian T. Howard. Built with Docusaurus.`,
    },
    algolia: {
      apiKey: '76b101bb2eea87aa1453c1db685f519c',
      indexName: 'focsipedia',
      algoliaOptions: {
        queryLanguages: ['en'],
        ignorePlurals: true,
      }, // Optional, if provided by Algolia
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/bhoward/focsipedia/edit/master/',
          remarkPlugins: [math, customBlocks, gridTables],
          rehypePlugins: [katex],
        },
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Brian T. Howard`,
          },
          remarkPlugins: [math, customBlocks, gridTables],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [
    '/focsipedia/toplevel.js',
    '/focsipedia/resetLocalPrelude.js',
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css',
  ],
};
