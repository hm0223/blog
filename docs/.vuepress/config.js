module.exports = {
  title: '就问你学不学',
  head: [
     ['link', {rel: 'icon', href: '/img/icon.jpg'}],
     ['link', {rel: 'stylesheet', href: '/css/style.css'}],
  ],
  base: '/blog/' ,
  description: '一时不学一时爽 一直不学一直爽',
  themeConfig: {
    nav: require('./nav'),
    sidebar: require('./sidebar')	
  }
}
