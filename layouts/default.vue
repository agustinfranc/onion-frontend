<template>
  <v-app>
    <template v-if="commerce && commerce.name">
      <v-card class="overflow-hidden">
        <v-app-bar
          v-if="commerce.cover_dirname"
          app
          prominent
          shrink-on-scroll
          fade-img-on-scroll
          scroll-threshold="500"
          extension-height="48"
          :src="commerce.cover_dirname"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top, rgba(30,30,30,.2), rgba(99,99,99,.0)"
            ></v-img>
          </template>

          <!-- <v-app-bar-title class="v-app-bar-title__content"
            >Title</v-app-bar-title
          > -->

          <div class="v-toolbar__title v-app-bar-title">
            <div class="v-app-bar-title__content" style="visibility: hidden">
              {{ commerce.fullname }}
            </div>
            <div
              class="v-app-bar-title__placeholder"
              style="visibility: hidden"
            >
              {{ commerce.fullname }}
            </div>
          </div>

          <v-spacer></v-spacer>

          <v-btn icon v-if="!searchField" @mouseover="searchField = true">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-text-field
            v-if="searchField"
            @mouseleave="hideSeachField"
            v-model="search"
            label="Buscar"
            solo
            clearable
          ></v-text-field>

          <template v-slot:extension>
            <v-card>
              <v-tabs dark show-arrows>
                <v-tabs-slider></v-tabs-slider>

                <v-tab
                  color="#fff"
                  class="white--text"
                  v-for="rubro in rubrosFiltered"
                  :key="rubro.name"
                >
                  <nuxt-link
                    :to="`#${rubro.link_name}`"
                    @click.native="scrollTo(`#${rubro.link_name}`)"
                  >
                    <span class="v-tab__personalized white--text">{{
                      rubro.name
                    }}</span>
                  </nuxt-link>
                </v-tab>
              </v-tabs>
            </v-card>
          </template>
        </v-app-bar>
      </v-card>
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

    <v-footer app>
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
      if (!this.search) this.searchField = false
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
.v-app-bar--is-scrolled .v-app-bar-title__placeholder {
  visibility: visible !important;
}
</style>