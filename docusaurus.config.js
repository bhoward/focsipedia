const math = require('remark-math');
const katex = require('rehype-katex');

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
        alt: 'My Site Logo', // TODO
        src: 'img/logo.svg',
      },
      links: [
        {to: 'docs/topics', label: 'Topics', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'},
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
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
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
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Brian T. Howard. Built with Docusaurus.`,
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
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Brian T. Howard`,
          },
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [
    '/focsipedia/eval.js',
    '/focsipedia/refmt.js',
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css',
  ],
};
