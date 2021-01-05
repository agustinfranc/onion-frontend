<template>
  <div>
    <template v-if="$fetchState.pending">
      <!-- <template> -->

      <v-container>
        <v-row>
          <v-col v-for="p in 2" :key="p" cols="6" md="4">
            <v-sheet class="pa-3">
              <v-skeleton-loader v-bind="attrs" type="card"></v-skeleton-loader>
            </v-sheet>
          </v-col>
        </v-row>

        <v-sheet v-for="p in 10" :key="p" class="pa-3">
          <v-skeleton-loader
            v-bind="attrs"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
        </v-sheet>
      </v-container>
    </template>

    <v-container v-if="rubros">
      <h3>Categorias</h3>

      <v-divider class="mt-4 mb-2"></v-divider>

      <v-chip-group column>
        <v-chip v-for="rubro in rubrosFiltered" :key="rubro.name">
          <nuxt-link
            :to="`#${rubro.link_name}`"
            @click.native="scrollTo(`#${rubro.link_name}`)"
          >
            <span class="v-tab__personalized white--text">{{
              rubro.name
            }}</span>
          </nuxt-link>
        </v-chip>
      </v-chip-group>
    </v-container>

    <template v-for="(rubro, index) in rubrosFiltered">
      <template v-if="withSlider && index == 0 && rubro.name == 'Promociones'">
        <v-container :key="rubro.name" :id="rubro.link_name">
          <h3>{{ rubro.name }}</h3>

          <v-divider class="my-5"></v-divider>

          <v-slide-group>
            <v-slide-item
              v-for="item in rubro.subrubros[0].products"
              :key="`${item.id}-carousel`"
            >
              <v-card class="ma-2" min-height="370" width="224" max-width="400">
                <v-img
                  v-if="item.avatar_dirname"
                  class="white--text align-end"
                  :class="item.disabled ? 'disabled' : ''"
                  height="200px"
                  :src="`${item.avatar_dirname}${item.avatar}`"
                >
                  <div
                    v-if="item.disabled"
                    class="fill-height d-flex flex-column justify-center"
                  >
                    <v-chip small class="ma-2" color="red" text-color="white">
                      No disponible
                    </v-chip>
                  </div>
                </v-img>

                <v-card-title
                  class="text-truncate d-inline-block"
                  style="width: 100%"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{ item.name }}</span>
                    </template>
                    <span>{{ item.name }}</span>
                  </v-tooltip>
                </v-card-title>

                <v-card-subtitle
                  class="pb-0 text-truncate__multiple-lines text-truncate__three-lines"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{
                        item.description
                      }}</span>
                    </template>
                    <span>{{ item.description }}</span>
                  </v-tooltip>
                </v-card-subtitle>

                <v-card-text class="text--primary">
                  <p class="mt-1">${{ item.price }}</p>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-container>
      </template>

      <template v-if="(withSlider && index > 0) || !withSlider">
        <div :key="rubro.name" :id="rubro.link_name">
          <v-container :key="rubro.name">
            <h3>{{ rubro.name }}</h3>
          </v-container>

          <v-divider></v-divider>

          <template v-for="(subrubro, index) in rubro.subrubros">
            <v-container
              v-if="!subrubro.is_general && subrubro.products.length > 0"
              :id="subrubro.link_name"
              :key="subrubro.name"
            >
              <span>{{ subrubro.name }}</span>
            </v-container>

            <v-container :key="index">
              <v-list three-line :key="index">
                <template v-for="(item, index) in subrubro.products">
                  <v-divider
                    :key="`${index}-${item.name}_divider`"
                    v-if="index > 0"
                  ></v-divider>

                  <v-list-item
                    :id="`${item.code}`"
                    :key="`${index}-${item.name}`"
                  >
                    <v-list-item-avatar v-if="item.avatar_dirname">
                      <v-img
                        :src="`${item.avatar_dirname}${item.avatar}`"
                        :class="item.disabled ? 'disabled' : ''"
                      >
                        <div
                          v-if="item.disabled"
                          class="fill-height d-flex flex-column justify-center"
                        >
                          <v-chip
                            x-small
                            class="ma-2"
                            color="red"
                            text-color="white"
                          >
                            No disponible
                          </v-chip>
                        </div>
                      </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-html="item.name"></v-list-item-title>

                      <v-list-item-subtitle>
                        <v-tooltip bottom close-delay="500">
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">{{
                              item.description
                            }}</span>
                          </template>
                          <span>{{ item.description }}</span>
                        </v-tooltip>
                      </v-list-item-subtitle>

                      <div>
                        <span v-if="item.price" class="mt-1 text-body-2"
                          >${{ item.price }}</span
                        >

                        <v-chip
                          v-for="price in item.product_prices"
                          :key="price.name"
                          class="v-chip-h--inherit ma-1 text-center"
                          outlined
                          label
                        >
                          {{ price.name }}
                          <br />
                          ${{ price.price }}
                        </v-chip>
                      </div>

                      <template v-for="hashtag in item.product_hashtags">
                        <nuxt-link
                          :key="hashtag.id"
                          :to="`#${hashtag.to}`"
                          @click.native="scrollTo(`#${hashtag.to}`)"
                        >
                          <span class="mt-1 text-body-2">{{
                            hashtag.name
                          }}</span>
                        </nuxt-link>
                      </template>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-container>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  async asyncData({ $axios, store, params, payload }) {
    //
  },

  async fetch() {
    if (this.$store.state.commerce && this.$store.state.commerce.rubros) {
      this.rubros = this.$store.state.commerce.rubros
      this.withSlider = this.$store.state.commerce.with_slider ?? true
      return
    }

    await this.$store.dispatch('saveTitle', this.$route.params.commerce)

    try {
      const url = `${this.$nuxt.context.env.apiUrl}${this.$route.params.commerce}/all`

      const res = await this.$axios.$get(url)

      await this.$store.dispatch('saveData', res)

      this.rubros = res.rubros
      this.params = this.$route.params
      this.withSlider = res.with_slider
    } catch (error) {
      console.error('Error:', error)
    }
  },
  fetchOnServer: false,

  data() {
    return {
      rubros: null,
      withSlider: true,
      params: null,
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
    }
  },

  mounted() {
    if (this.$route.hash) {
      setTimeout(() => this.scrollTo(this.$route.hash), 500)
    }
  },

  computed: {
    ...mapState(['search']),
    ...mapGetters(['rubrosFiltered']),
  },

  methods: {
    scrollTo: function (hashtag) {
      const el = document.getElementById(this.$route.hash.slice(1))
      if (el) {
        window.scrollTo(0, el.offsetTop)
      }
    },
  },
}
</script>

<style>
.v-chip.v-size--default.v-chip-h--inherit {
  height: inherit;
}

.disabled .v-image__image.v-image__image--cover {
  filter: grayscale(100%);
}

.v-slide-group__wrapper {
  touch-action: pan-y !important;
}
</style>