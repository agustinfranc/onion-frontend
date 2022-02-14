<template>
  <div>
    <div
      v-for="rubro in rubrosFiltered"
      :id="rubro.link_name"
      :key="rubro.name"
      class="background-default"
    >
      <v-container :key="rubro.name">
        <h3>{{ rubro.name }}</h3>
      </v-container>

      <div class="px-3">
        <v-divider></v-divider>
      </div>

      <template v-for="(subrubro, index) in rubro.subrubros">
        <v-container
          v-if="!subrubro.is_general"
          :id="subrubro.link_name"
          :key="subrubro.name"
        >
          <span>{{ subrubro.name }}</span>
        </v-container>

        <!-- Lists -->
        <v-container v-if="!subrubro.commerces[0].pivot.slideable" :key="index">
          <v-list :key="index" three-line>
            <template v-for="(item, index) in subrubro.products">
              <v-divider
                v-if="index > 0"
                :key="`${index}-${item.name}_divider`"
              ></v-divider>

              <v-list-item :id="`${item.code}`" :key="`${index}-${item.name}`">
                <v-list-item-avatar v-if="item.avatar_dirname">
                  <v-img
                    :src="`${item.avatar_dirname}${
                      item.avatar ? item.avatar : ''
                    }`"
                    :class="{ disabled: item.disabled }"
                    @click="showImageDialog(item)"
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
                        {{ $t('product.disabled') }}
                      </v-chip>
                    </div>
                  </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.name"></v-list-item-title>

                  <v-list-item-subtitle>
                    <v-tooltip bottom close-delay="500">
                      <template #activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          v-on="on"
                          v-html="item.description"
                        ></span>
                      </template>
                      <span v-html="item.description"></span>
                    </v-tooltip>
                  </v-list-item-subtitle>

                  <div>
                    <span
                      v-if="item.price && !item.product_prices.length"
                      class="mt-1 text-body-2"
                      >{{ commerce.currency ? commerce.currency.symbol : ''
                      }}{{ item.price }}</span
                    >

                    <v-menu
                      v-if="
                        item.product_prices.length &&
                        commerce.name === 'vape-street'
                      "
                      offset-y
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          small
                          depressed
                          class="mt-1"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Flavors
                          <v-icon right small>
                            mdi-arrow-down-drop-circle-outline
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="price in item.product_prices"
                          :key="price.name"
                        >
                          <v-list-item-title>{{
                            price.name
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-chip
                      v-for="price in item.product_prices"
                      v-else
                      :key="price.name"
                      class="v-chip-h--inherit ma-1 text-center"
                      outlined
                      label
                    >
                      {{ price.name }}
                      <br v-if="price.name && price.price" />
                      <span v-if="price.price">
                        {{ commerce.currency ? commerce.currency.symbol : ''
                        }}{{ price.price }}
                      </span>
                    </v-chip>
                  </div>

                  <template v-for="hashtag in item.product_hashtags">
                    <nuxt-link
                      :key="hashtag.id"
                      :to="`#${hashtag.to}`"
                      @click.native="scrollTo(`#${hashtag.to}`)"
                    >
                      <span class="mt-1 text-body-2">{{ hashtag.name }}</span>
                    </nuxt-link>
                  </template>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-container>

        <!-- Slides -->
        <v-container v-if="subrubro.commerces[0].pivot.slideable" :key="index">
          <v-slide-group>
            <v-slide-item
              v-for="item in subrubro.products"
              :key="`${item.id}-carousel`"
            >
              <v-card class="ma-2" min-height="370" width="224" max-width="400">
                <v-img
                  v-if="item.avatar_dirname"
                  class="white--text align-end"
                  :class="{ disabled: item.disabled }"
                  height="200px"
                  :src="`${item.avatar_dirname}${
                    item.avatar ? item.avatar : ''
                  }`"
                  @click="showImageDialog(item)"
                >
                  <div
                    v-if="item.disabled"
                    class="fill-height d-flex flex-column justify-center"
                  >
                    <v-chip small class="ma-2" color="red" text-color="white">
                      {{ $t('product.disabled') }}
                    </v-chip>
                  </div>
                </v-img>

                <v-card-title
                  class="text-truncate d-inline-block"
                  style="width: 100%"
                >
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{ item.name }}</span>
                    </template>
                    <span>{{ item.name }}</span>
                  </v-tooltip>
                </v-card-title>

                <v-card-subtitle
                  class="pb-0 text-truncate__multiple-lines text-truncate__three-lines"
                >
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on" v-html="item.description">
                      </span>
                    </template>
                    <span v-html="item.description"></span>
                  </v-tooltip>
                </v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>
                    <span
                      v-if="item.price && !item.product_prices.length"
                      class="mt-1 text-body-2"
                      >{{ commerce.currency ? commerce.currency.symbol : ''
                      }}{{ item.price }}</span
                    >

                    <v-chip
                      v-for="price in item.product_prices"
                      :key="price.name"
                      class="v-chip-h--inherit ma-1 text-center"
                      outlined
                      label
                    >
                      {{ price.name }}
                      <br v-if="price.name && price.price" />
                      <span v-if="price.price">
                        {{ commerce.currency ? commerce.currency.symbol : ''
                        }}{{ price.price }}
                      </span>
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-container>
      </template>
    </div>

    <ImageDialog v-model="dialog.show" :dialog="dialog" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialog: {
        show: false,
        imgSrc: '',
        imgLazySrc: 'https://picsum.photos/id/11/10/6',
      },
    }
  },
  computed: {
    ...mapState(['commerce']),
    ...mapGetters(['rubrosFiltered']),
  },
  methods: {
    showImageDialog(item) {
      if (!item.avatar_dirname) return

      this.dialog.imgSrc = item.avatar_dirname + item.avatar

      this.dialog.show = true
    },
  },
}
</script>

<style>
.disabled .v-image__image.v-image__image--cover {
  filter: grayscale(100%);
}

.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 75%;
}
</style>
