require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    author: '@ch4nd4n',
    siteTitle: `Chandan Kumar`,
    siteHeadline: `Chandan Kumar - Pointers to ramblings`,
    siteLanguage: 'en',
    siteImage: 'ck_4x.png',
    siteUrl: `https://www.chandankumar.com`,
    siteDescription: 'chandankumar.com is space for Chandan Kumar to ramble about random things and some technical articles by just another Software "Engineer" in Bangalore.',
    siteTitleAlt: `Chandan Kumar`,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/ch4nd4n`,
          },
          {
            name: `Instagram`,
            url: `https://www.instagram.com/ch4nd4n/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `chandan kumar`,
        short_name: `chandan-kumar`,
        description: `Chandan Kumar Software engineer in Bangalore.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}
