module.exports = [
    {
        id: 'post',
        dirname: '_posts',
        path: '/',
    },
    {
        id: 'springboot',
        dirname: '_posts/_springboot',
        path: '/springboot/',
        title: 'Spring Boot', 
        layout: 'IndexWriting',
        frontmatter: { 
            tag: 'vuepress'
        },
        itemLayout: 'Spring Boot',
        itemPermalink: '/springboot/:year/:month/:day/:slug',
    },
    {
        id: 'junit', // Unique id for current classifier
        dirname: '_posts/_junit', // Matched directory name
        path: '/junit/', // Entry page for current classifier
        title: 'Junit', // Entry and pagination page titles for current classifier.
        layout: 'IndexWriting', // Layout component name for entry page.
        frontmatter: { //Front matter for entry page.
            tag: 'vuepress'
        },
        itemLayout: 'Junit', // Layout for matched pages.
        itemPermalink: '/junit/:year/:month/:day/:slug', // Permalink for matched pages.
    },
    {
        id: 'java', // Unique id for current classifier
        dirname: '_posts/_java', // Matched directory name
        path: '/java/', // Entry page for current classifier
        title: 'Java', // Entry and pagination page titles for current classifier.
        layout: 'IndexWriting', // Layout component name for entry page.
        frontmatter: { //Front matter for entry page.
            tag: 'vuepress'
        },
        itemLayout: 'Java', // Layout for matched pages.
        itemPermalink: '/java/:year/:month/:day/:slug', // Permalink for matched pages.
    }
]
