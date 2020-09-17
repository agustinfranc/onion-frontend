<template>
  <v-app>
    <v-card v-if="data" class="overflow-hidden">
      <v-app-bar
        v-if="data.assets_dirname"
        app
        prominent
        shrink-on-scroll
        scroll-threshold="500"
        :src="`${data.assets_dirname}background.jpg`"
      >
        <v-spacer></v-spacer>

        <!-- // ! Desarrollar barra de busqueda -->
        <!-- <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>-->

        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top, rgba(30,30,30,.2), rgba(99,99,99,.0)"></v-img>
        </template>

        <template v-slot:extension>
          <v-card>
            <v-tabs dark show-arrows>
              <v-tabs-slider></v-tabs-slider>

              <v-tab color="#fff" class="white--text" v-for="rubro in rubros" :key="rubro.nombre">
                <nuxt-link
                  :to="`#${rubro.link_name}`"
                  @click.native="scrollTo(`#${rubro.link_name}`)"
                >
                  <span class="v-tab__personalized white--text">{{rubro.name}}</span>
                </nuxt-link>
              </v-tab>
            </v-tabs>
          </v-card>
        </template>
      </v-app-bar>
    </v-card>

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
            <router-link :to="'/'">
              <span class="white--text">Onion</span>
            </router-link>
          </span>
        </div>
        <div class="text-right">
          <a v-for="icon in icons" :key="icon.to" :href="icon.to">
            <v-icon class="mx-1" size="24px">{{ icon.name }}</v-icon>
          </a>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

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
  methods: {
    scrollTo: function (hashtag) {
      const el = document.querySelector(hashtag)
      if (el) {
        window.scrollTo(0, el.offsetTop)
      }
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    ...mapState(['data', 'rubros', 'title']),
  },
}
</script>