// .vuepress/config.js
module.exports = {
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            // set `platform` rather than `api`
            platform: 'github',
            // all other options of Vssue are allowed
            owner: 'hm0223',
            repo: 'blog',
            clientId: '1be8999631c439845b0d',
            clientSecret: '1c284f05a4c1c9dd8ee6711bea8f93d160a21c0b',
            proxy: url => `https://cors-anywhere.herokuapp.com/${url}`,
            autoCreateIssue: true,
        },
    },
    title: "hwf's blog", // Title for the site. This will be displayed in the navbar.
    head: [
        ['link', {rel: 'icon', href: '/img/icon.jpg'}],
        ['link', {rel: 'stylesheet', href: '/css/style.css'}],
    ],
    theme: '@vuepress/theme-blog',
    base: '/blog/',
    themeConfig: {
        nav: require('./nav'),
        footer: {
            contact: require('./footer'),
            copyright: require('./copyright'),
        },
        directories: require('./directories'),
        globalPagination: {
            prevText: 'Prev',
            nextText: 'Next',
            lengthPerPage: '4',
            layout: 'Pagination',
        },
        // comment: {
        //   service: 'vssue',
        //   owner: 'hm0223',
        //   repo: 'blog',
        //   clientId: '1be8999631c439845b0d',
        //   clientSecret: '1c284f05a4c1c9dd8ee6711bea8f93d160a21c0b',
        // },
        summaryLength: 100,
        smoothScroll: true,
    }
}