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

              <v-tab
                color="#fff"
                class="white--text"
                v-for="rubro in rubros"
                :key="rubro.nombre"
              >
                <nuxt-link :to="`#${rubro.name}`" @click.native="scrollTo(`#${rubro.name}`)">
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
    <v-footer :absolute="!fixed" app>
      <div class="text-center">
        <span>&copy; {{ new Date().getFullYear() }} |</span>
        <span>
          made with
          <v-icon>mdi-heart</v-icon>by
          <router-link :to="'/'">
            <span class="white--text">Onion</span>
          </router-link>
        </span>
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
      fixed: false,
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
      miniVariant: false,
    }
  },
  methods: {
    scrollTo: function (hashtag) {
      const el = document.querySelector(hashtag);
      console.log(el);
      if (el) {
        console.log(el.offsetTop);
        window.scrollTo(0, el.offsetTop);
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