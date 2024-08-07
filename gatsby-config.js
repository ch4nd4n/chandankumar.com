require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    author: "@ch4nd4n",
    siteTitle: `Chandan Kumar`,
    siteHeadline: `Chandan Kumar`,
    siteUrl: `https://www.chandankumar.com`,
    siteDescription:
      "A blog by Chandan Kumar. chandankumar.com is a collection of notes, tutorials and articles on software programming, photography etc. ex-Liftoff, ex-Coreobjects",
    siteTitleAlt: `Chandan Kumar`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        formatString: "DD MMMM, YYYY",
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
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        enableWebVitalsTracking: true,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `chandan kumar`,
        short_name: `chandan-kumar`,
        description: `A blog by Chandan Kumar. chandankumar.com is a collection of notes, tutorials and articles on software programming, photography etc. ex-Liftoff, ex-Coreobjects`,
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
};
