/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Space Explorer`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        'gatsby-plugin-postcss',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/rocket.png',
                icon_options: {
                    purpose: `any`
                },
                name: `Space Explorer`,
                short_name: `Space Explorer`,
                start_url: `/`,
                display: "standalone",
                background_color: 'black',
                theme_color: '#181818'
            },
        },
        'gatsby-plugin-offline',
    ],
    flags: {
        DEV_SSR: true,
    },
};
