<template>
  <v-app>
    <template v-if="commerce && commerce.name">
      <v-sheet
        height="280"
        class="v-image__image--cover background-cover"
        :style="`background-image: linear-gradient(to top, rgba(30, 30, 30, 0.2), rgba(99, 99, 99, 0)), url(${commerce.cover_dirname});`"
      >
        <div class="d-flex flex-column align-end justify-end" style="height: 100%">
          <div class="ma-3 mb-auto" style="position: fixed; top: 0; z-index: 2;">
            <v-btn
              fab
              small
              v-if="!searchField"
              @mouseover="showSeachField"
              @mouseout="hideSeachField"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-text-field
              :style="{ display: displaySearch }"
              ref="search"
              @focusout="hideSeachField"
              v-model="search"
              label="Buscar"
              solo
              clearable
            ></v-text-field>
          </div>

          <div style="position: fixed; top: 100px;">
            <v-img
              v-if="commerce.avatar_dirname"
              class="ma-3 rounded-circle"
              :src="commerce.avatar_dirname"
              max-width="100"
              height="100"
              style="border: 3px solid white"
            ></v-img>
          </div>

          <div
            class="transition-swing text-h5 pa-3 rounded-t-xl d-flex justify-space-between align-center theme--parent"
            style="width: 100%; z-index: 0;"
          >
            {{ commerce.fullname }}

            <div v-if="commerce.whatsapp_number || commerce.instagram_account">
              <a
                v-if="commerce.whatsapp_number"
                :href="`https://wa.me/${commerce.whatsapp_number}/`"
                target="_blank"
              >
                <v-icon class="mx-1" size="24px">mdi-whatsapp</v-icon>
              </a>

              <a
                v-if="commerce.instagram_account"
                :href="`https://www.instagram.com/${commerce.instagram_account}/`"
                target="_blank"
              >
                <v-icon class="mx-1" size="24px">mdi-instagram</v-icon>
              </a>
            </div>
          </div>
        </div>
      </v-sheet>
    </template>

    <template v-else>
      <v-card class="overflow-hidden">
        <v-app-bar app prominent>
          <v-spacer></v-spacer>

          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top, rgba(30,30,30,.2), rgba(99,99,99,.0)"
            ></v-img>
          </template>

          <template v-slot:extension>
            <v-card>
              <v-tabs dark show-arrows>
                <v-tabs-slider></v-tabs-slider>
              </v-tabs>
            </v-card>
          </template>
        </v-app-bar>
      </v-card>
    </template>

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
              <span class="white--text">Onion</span>
            </router-link>
          </span>
        </div>
        <div class="text-right">
          <a
            v-for="icon in icons"
            :key="icon.to"
            :href="icon.to"
            target="_blank"
          >
            <v-icon class="mx-1" size="24px">{{ icon.name }}</v-icon>
          </a>
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
      searchField: false,
      displaySearch: 'none',
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
  methods: {
    scrollTo: function (hashtag) {
      const el = document.querySelector(hashtag)
      if (el) {
        window.scrollTo(0, el.offsetTop)
      }
    },
    hideSeachField() {
      if (!this.search) {
        this.searchField = false
        this.displaySearch = 'none'
      }
    },
    showSeachField() {
      this.searchField = true
      this.displaySearch = 'block'

      setTimeout(() => {
        this.$refs.search.focus()
      })
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    ...mapState(['commerce', 'title']),
    ...mapGetters(['rubrosFiltered']),
    search: {
      get() {
        return this.$store.state.search
      },
      set(value) {
        this.$store.dispatch('setSearch', value)
      },
    },
  },
}
</script>

<style scoped>
.theme--dark.v-application .theme--parent {
  background: #121212;
  color: #FFFFFF;
}

.theme--light.v-application .theme--parent {
  background: #FFFFFF;
  color: rgba(0, 0, 0, 0.87);
}

.v-app-bar--is-scrolled .v-app-bar-title__placeholder {
  visibility: visible !important;
}

.background-cover {
  background-attachment: fixed;
  /* background-size: 100% auto; */
  background-size: 125% auto;
  background-position: center top;
}
</style>