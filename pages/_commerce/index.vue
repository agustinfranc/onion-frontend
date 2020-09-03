<template>
  <div>
    <v-container v-if="rubros" :id="rubros[0].name">
      <h3>{{rubros[0].name}}</h3>

      <v-divider class="my-5"></v-divider>

      <div id="carousel">
        <flickity ref="flickity" :options="flickityOptions">
          <div
            class="carousel-cell"
            v-for="item in rubros[0].subrubros[0].products"
            :key="`${item.id}-carousel`"
          >
            <v-card class="mx-auto" min-height="370" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="`${item.avatar_dirname}${item.avatar}`"
              ></v-img>

              <v-card-title class="text-truncate">{{ item.name }}</v-card-title>

              <v-card-subtitle
                class="pb-0 text-truncate__multiple-lines text-truncate__three-lines"
              >{{ item.description }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <p class="mt-1">${{ item.price }}</p>
              </v-card-text>
            </v-card>
          </div>
        </flickity>
      </div>
    </v-container>

    <template v-for="(rubro, index) in rubros">
      <template v-if="index > 0">
        <div :key="rubro.name" :id="rubro.name">
          <v-container :key="rubro.name">
            <h3>{{rubro.name}}</h3>
          </v-container>

          <v-divider></v-divider>

          <template v-for="(subrubro, index) in rubro.subrubros">
            <v-container v-if="index > 0" :id="subrubro.name" :key="subrubro.name">
              <span>{{subrubro.name}}</span>
            </v-container>

            <v-list three-line :key="index">
              <template v-for="(item, index) in subrubro.products">
                <v-divider v-if="index > 0"></v-divider>

                <v-list-item :id="`${item.code}`" :key="`${index}-${item.name}`">
                  <v-list-item-avatar v-if="item.avatar">
                    <v-img :src="`${item.avatar_dirname}${item.avatar}`"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
                    <p v-if="item.price" class="mt-1 text-body-2">${{ item.price }}</p>
                    <template v-for="hashtag in item.product_hashtags">
                      <nuxt-link :key="hashtag.id" :to="`#${hashtag.to}`" @click.native="scrollTo(`#${hashtag.to}`)">
                        <span class="mt-1 text-body-2">{{ hashtag.name }}</span>
                      </nuxt-link>
                    </template>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      rubros: null,
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        cellAlign: 'left',
        contain: true,
        autoPlay: true,
        // any options from Flickity can be used
      },
      params: null,
    }
  },
  mounted() {
    if (this.$route.hash) {
      setTimeout(() => this.scrollTo(this.$route.hash), 500)
    }
  },
  methods: {
    scrollTo: function (hashtag) {
      const el = document.getElementById(this.$route.hash.slice(1))
      console.log(hashtag)
      console.log(el.offsetTop)
      if (el) {
        window.scrollTo(0, el.offsetTop)
      }
    },
  },
  async asyncData({ $axios, store, params }) {
    if (store.state.rubros) return { rubros: store.state.rubros }

    await store.dispatch('saveTitle', params.commerce)

    try {
      const url = `${process.env.apiUrl}${params.commerce}/all`

      const res = await $axios.$get(url)

      await store.dispatch('saveData', res)

      await store.dispatch('saveRubros', res.rubros)

      return {
        rubros: res.rubros,
        params: params,
      }
    } catch (error) {
      console.log('Error:', error)
    }
  },
}
</script>