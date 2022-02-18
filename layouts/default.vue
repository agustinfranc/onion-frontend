<template>
  <v-app>
    <v-main>
      <div>
        <nuxt />
      </div>
    </v-main>

    <v-footer v-if="commerce.has_footer" app>
      <div class="d-flex justify-space-between">
        <div class="text-left">
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </div>
        <div class="text-center">
          <span>
            made with
            <v-icon>mdi-heart</v-icon> by
            <router-link to="/">
              <span
                :class="
                  $vuetify.theme.dark
                    ? 'white--text'
                    : 'grey--text text--darken-4'
                "
                >Onion</span
              >
            </router-link>
          </span>
        </div>
        <div class="text-right">
          <a href="https://www.instagram.com/onion.com.ar/" target="_blank">
            <v-icon class="mx-1" size="24px">mdi-instagram</v-icon>
          </a>

          <v-btn small icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      icons: [
        { name: 'mdi-facebook', to: 'https://www.facebook.com/onion.com.ar' },
        {
          name: 'mdi-instagram',
          to: 'https://www.instagram.com/onion.com.ar/',
        },
      ],
      miniVariant: false,
    }
  },

  head() {
    return {
      title: this.title,
      meta: [{ hid: 'language', name: 'language', content: this.getLocale }],
      htmlAttrs: {
        lang: this.getLocale,
        amp: false,
      },
    }
  },

  computed: {
    ...mapState(['commerce', 'title']),
    ...mapGetters(['rubrosFiltered']),
    getLocale() {
      return this.$i18n.locale
    },
  },

  methods: {
    scrollTo(hashtag) {
      const el = document.querySelector(hashtag)
      if (el) {
        window.scrollTo(0, el.offsetTop)
      }
    },
  },
}
</script>

<style scoped>
.theme--dark.v-application .theme--parent {
  background: #121212;
  color: #ffffff;
}

.theme--light.v-application .theme--parent {
  background: #f2f2f2;
  color: rgba(0, 0, 0, 0.87);
}

.v-app-bar--is-scrolled .v-app-bar-title__placeholder {
  visibility: visible !important;
}
</style>
