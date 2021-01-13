import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-ssr
   */
  ssr: true, // default: true
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target
   */
  target: 'server', // default: server
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
      { property: 'og:title', content: 'Onion' },
      { property: 'og:type', content: 'website' },
      { property: 'og:host', content: 'https://onion.ar' },
      { property: 'og:url', content: 'https://onion.ar' },
      {
        property: 'og:description',
        content:
          'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida',
      },
      { property: 'og:image', content: '/img/logo_blue.png' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon_min.png' },
      { rel: 'shortcut icon', href: '/icon_min.png' },
      { rel: 'apple-touch-icon', href: '/icon_min.png' },
      { rel: 'canonical', href: 'https://onion.ar' },
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
    // { src: '~/plugins/flickity', ssr: false, mode: 'client' },   //? in desuse
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
    '@nuxtjs/axios', // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/gtm',
    'nuxt-i18n', // https://i18n.nuxtjs.org/es/
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
      },
      {
        code: 'es',
        name: 'Español',
        iso: 'es-ES',
      },
    ],
    defaultLocale: 'es',
    vueI18n: {
      fallbackLocale: 'es',
      messages: {
        en: {
          welcome: 'Welcome',
          settings: 'Settings',
          details: 'Details',
          search: 'Search',
          error: 'Something went wrong',
          categories: 'Categories',
          subcategories: 'Subcategories',

          product: {
            title: 'Product',
            code: 'Code',
            name: 'Name',
            category: 'Category',
            subcategory: 'Subcategory',
            price: 'Price',
            visible: 'Visible',
            disabled: 'Disabled',
            description: 'Description',
          },
        },
        es: {
          welcome: 'Bienvenido',
          settings: 'Ajustes',
          details: 'Detalles',
          search: 'Buscar',
          error: 'Ocurrió un error',
          categories: 'Categorias',
          subcategories: 'Subcategorias',

          product: {
            title: 'Producto',
            code: 'Código',
            name: 'Nombre',
            category: 'Categoria',
            subcategory: 'Subcategoria',
            price: 'Precio',
            visible: 'Visible',
            disabled: 'No disponible',
            description: 'Descripción',
          },
        },
      },
    },
  },

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
