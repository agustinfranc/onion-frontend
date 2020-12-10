import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: true, // Disable Server Side rendering
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Environment Variables
   ** See https://nuxtjs.org/api/configuration-env/
   */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'https://api.onion.ar/api/',
  },
  /*
   ** Dinamic Routes
   ** See https://nuxtjs.org/api/configuration-generate
   */
  generate: {
    routes() {
      const url = process.env.API_URL
        ? process.env.API_URL + 'commerces'
        : 'https://api.onion.ar/api/commerces'
      return axios.get(url).then((res) => {
        return res.data.map((commerce) => {
          return {
            route: commerce.name,
            payload: commerce,
          }
        })
      })
    },
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: 'Onion',
    title: 'Onion',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index,follow' },
      { name: 'author', content: 'Onion' },
      { name: 'language', content: 'es' },
      { name: 'og:title', content: 'Onion' },
      { name: 'og:type', content: 'website' },
      { name: 'og:host', content: 'https://onion.com.ar' },
      { name: 'og:url', content: 'https://onion.com.ar' },
      {
        name: 'og:description',
        content:
          'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida',
      },
      { name: 'og:image', content: '/img/logo_blue.png' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/icon.png' },
      { rel: 'canonical', href: 'https://www.onion.com.ar' },
    ],
    script: [
      // {
      //   "data-ad-client": "ca-pub-9710451698739069",
      //   src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      // },
      {
        src: 'js/pixel.js',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/flickity', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/gtm',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  gtm: {
    id: 'GTM-KM4BNSW', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID,
    },
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    icons: {
      iconfont: 'mdi',
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
