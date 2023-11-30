// module.exports = {
//   title: 'I asked if you were learning',
//   head: [
//      ['link', {rel: 'icon', href: '/img/icon.jpg'}],
//      ['link', {rel: 'stylesheet', href: '/css/style.css'}],
//   ],
//   base: '/blog/' ,
//   description: 'A little off, a little off',
//   themeConfig: {
//     nav: require('./nav'),
//     sidebar: require('./sidebar')	
//   }
// }

// .vuepress/config.js
module.exports = {plugins: {
    '@vssue/vuepress-plugin-vssue': {
      // set `platform` rather than `api`
      platform: 'github',
      // all other options of Vssue are allowed
      owner: 'hm0223',
      repo: 'blog',
      clientId: '1be8999631c439845b0d',
      clientSecret: '1c284f05a4c1c9dd8ee6711bea8f93d160a21c0b',
    },
  },
  title: "hwf's blog", // Title for the site. This will be displayed in the navbar.
  head: [
    ['link', {rel: 'icon', href: '/img/icon.jpg'}],
    ['link', {rel: 'stylesheet', href: '/css/style.css'}],
  ],
  theme: '@vuepress/theme-blog',
  base: '/blog/' ,
  themeConfig: {
    // Please keep looking down to see the available options.
    nav: require('./nav-v2'),
    // sidebar: require('./sidebar')
    footer: {
      contact: require('./footer'),
      copyright: require('./copyright'),
    },
    globalPagination: {
      prevText:'Prev', 
      nextText:'Next', 
      lengthPerPage:'4', 
      layout:'Pagination',
    },
    comment: {
      service: 'vssue',
      owner: 'hm0223',
      repo: 'blog',
      clientId: '1be8999631c439845b0d',
      clientSecret: '1c284f05a4c1c9dd8ee6711bea8f93d160a21c0b',
    },
    summaryLength: 100,
    smoothScroll: true
  }
}