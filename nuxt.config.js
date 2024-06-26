import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  server: {
    port: process.env.PORT || 3000, // default: 3000
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
  //  Used for static mode
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
    title: 'Onion',
    titleTemplate: 'Onion',
    htmlAttrs: {
      lang: 'es',
      amp: false,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index,follow' },
      { name: 'author', content: 'Onion' },
      { hid: 'language', name: 'language', content: 'es' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida',
      },
      { hid: 'og:title', property: 'og:title', content: 'Onion' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:host', property: 'og:host', content: 'https://onion.ar' },
      { hid: 'og:url', property: 'og:url', content: 'https://onion.ar' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Onion' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Vendé Más Con Tu Tienda Online. Desde tu carta digital hasta tu App a medida',
      },
      { hid: 'og:image', property: 'og:image', content: '/img/logo_blue.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon_min.png' },
      { rel: 'shortcut icon', href: '/icon_min.png' },
      { rel: 'apple-touch-icon', href: '/icon_min.png' },
      { hid: 'canonical', rel: 'canonical', href: 'https://onion.ar' },
    ],
    script: [
      // {
      //   "data-ad-client": "ca-pub-9710451698739069",
      //   src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      // },
      // Pixel desactivado por el uso de cookies, queremos evitar el uso abusivo de seguimiento
      // {
      //   src: '/js/pixel.js',
      // },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss', '@/assets/css/helpers.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/flickity', ssr: false, mode: 'client' }, // ? used in landing
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
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios', // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/gtm',
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org/es/
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
      {
        code: 'ar',
        name: 'العربية',
        iso: 'ar-AR',
      },
    ],
    defaultLocale: 'es',
    vueI18n: {
      fallbackLocale: 'es',
      messages: {
        en: {
          Welcome: 'Welcome',
          Settings: 'Settings',
          Details: 'Details',
          Search: 'Search',
          'Something went wrong': 'Something went wrong',
          Categories: 'Categories',
          Subcategories: 'Subcategories',
          '| Access to our digital menu | Developed by Onion':
            '| Access to our digital menu | Developed by Onion',
          Product: 'Product',
          Code: 'Code',
          Name: 'Name',
          Category: 'Category',
          Subcategory: 'Subcategory',
          Price: 'Price',
          Visible: 'Visible',
          Disabled: 'Disabled',
          Description: 'Description',
        },
        es: {
          Welcome: 'Bienvenido',
          Settings: 'Ajustes',
          Details: 'Detalles',
          Search: 'Buscar',
          'Something went wrong': 'Ocurrió un error',
          Categories: 'Categorias',
          Subcategories: 'Subcategorias',
          '| Access to our digital menu | Developed by Onion':
            '| Accedé a nuestro menú digital! | Desarrollado por el equipo de Onion',
          Product: 'Producto',
          Code: 'Código',
          Name: 'Nombre',
          Category: 'Categoria',
          Subcategory: 'Subcategoria',
          Price: 'Precio',
          Visible: 'Visible',
          Disabled: 'No disponible',
          Description: 'Descripción',
        },
        ar: {
          Welcome: 'مرحبًا',
          Settings: 'الإعدادات',
          Details: 'التفاصيل',
          Search: 'بحث',
          'Something went wrong': 'حدث خطأ ما',
          Categories: 'الفئات',
          Subcategories: 'الفئات الفرعية',
          '| Access to our digital menu | Developed by Onion':
            '| الوصول إلى قائمتنا الرقمية | تم تطويرها بواسطة بصلة',
          Product: 'المنتج',
          Code: 'الرمز',
          Name: 'الاسم',
          Category: 'الفئة',
          Subcategory: 'الفئة الفرعية',
          Price: 'السعر',
          Visible: 'مرئي',
          Disabled: 'معطل',
          Description: 'الوصف',
        },
      },
    },
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  },

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
