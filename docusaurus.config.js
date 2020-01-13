module.exports = {
  title: 'FoCSipedia',
  tagline: 'Foundations of Computation',
  url: 'https://purl.org/focsipedia',
  baseUrl: '/',
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
        {to: 'docs/doc1', label: 'Docs', position: 'left'},
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
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
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
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
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
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [
    '/eval.js',
    '/refmt.js',
  ],
};
