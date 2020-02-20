module.exports = {
  title: 'タイトル',
  description: 'ディスクリプション',
  base: '/githublog/',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    authorAvatar: 'https://octodex.github.com/images/linktocat.jpg',
    blogConfig: {
      category: { 
        location: 2, 
        text: 'Category' 
      },
      tag: { 
        location: 3, 
        text: 'Tag' 
      }
    },
    lastUpdated: 'Last Updated',
    nav: [
      { 
        text: 'Home', 
        link: '/', 
        icon: 'reco-home' 
      },
      { 
        text: 'TimeLine', 
        link: '/timeline/', 
        icon: 'reco-date' 
      }
    ],
    sidebar: 'auto',
    search: true,
    searchMaxSuggestions: 10
  },
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom', 'flowchart'] 
}