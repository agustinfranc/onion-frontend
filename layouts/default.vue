<template>
  <v-app>

    <v-app-bar fixed app prominent :src="`${data.assets_dirname}background.jpg`">

      <template v-slot:extension>
        <v-card>
          <v-tabs dark show-arrows>
            <v-tabs-slider></v-tabs-slider>

            <v-tab color="#fff" class="white--text" v-for="rubro in rubros" :key="rubro.nombre" :href="'#' + rubro.name">
              <nuxt-link :to="'#' + rubro.name ">
                <span class="v-tab__personalized white--text">{{rubro.name}}</span>
              </nuxt-link>
            </v-tab>
          </v-tabs>
        </v-card>
      </template>
    </v-app-bar>

    <v-main>
      <div>
        <nuxt />
      </div>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
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