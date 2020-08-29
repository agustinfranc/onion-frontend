import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3001, // default: 3000
    host: 'localhost' // default: localhost
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Environment Variables
  ** See https://nuxtjs.org/api/configuration-env/
  */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
    apiUrl: process.env.API_URL || 'http://local.catalogo/api/',
  },
  /*
  ** Dinamic Routes
  ** See https://nuxtjs.org/api/configuration-generate
  */
  generate: {
    routes: ['/marlon']
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
      { name: 'og:title', content: 'Onion' },
      { name: 'og:type', content: 'website' },
      { name: 'og:host', content: 'https://onion.com.ar' },
      { name: 'og:url', content: 'https://onion.com.ar' },
      { name: 'og:description', content: 'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida' },
      { hid: 'description', name: 'description', content: 'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: "~/plugins/localStorage.js", ssr: false },
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
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    //'@nuxtjs/pwa',
    "@nuxtjs/dotenv",
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
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
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
