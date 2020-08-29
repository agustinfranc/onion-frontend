<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->

    <v-app-bar fixed app prominent :src="`${data.assets_dirname}background.jpg`">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->

      <!-- <v-toolbar-title v-text="title" /> -->

      <!-- <v-card>
        <v-tabs dark background-color="teal darken-3" show-arrows>
          <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

          <v-tab v-for="i in 30" :key="i" :href="'#tab-' + i">Item {{ i }}</v-tab>
        </v-tabs>
      </v-card>-->

      <template v-slot:extension>
        <v-card>
          <v-tabs dark show-arrows>
            <v-tabs-slider></v-tabs-slider>

            <!-- <template v-for="rubro in rubros">
              <nuxt-link :to="'#' + rubro.nombre" :key="rubro.nombre">
                <v-tab :key="rubro.nombre" :href="'#' + rubro.nombre">{{rubro.nombre}}</v-tab>
              </nuxt-link>
            </template>-->

            <v-tab color="#fff" class="white--text" v-for="rubro in rubros" :key="rubro.nombre" :href="'#' + rubro.nombre">
              <nuxt-link :to="'#' + rubro.nombre ">
                <span class="v-tab__personalized white--text">{{rubro.nombre}}</span>
              </nuxt-link>
              <!-- {{rubro.nombre}} -->
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