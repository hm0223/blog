module.exports = [
    {
        id: 'post',
        dirname: '_posts',
        path: '/',
    },
    {
        id: 'writing', // Unique id for current classifier
        dirname: '_writings', // Matched directory name
        path: '/writings/', // Entry page for current classifier
        title: '隨筆', // Entry and pagination page titles for current classifier.
        layout: 'IndexWriting', // Layout component name for entry page.
        frontmatter: { //Front matter for entry page.
            tag: 'vuepress'
        },
        itemLayout: 'Writing', // Layout for matched pages.
        itemPermalink: '/writings/:year/:month/:day/:slug', // Permalink for matched pages.
    }
]
