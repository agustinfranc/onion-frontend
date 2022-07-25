<template>
  <v-container id="commerce-products-list">
    <v-list nav three-line class="px-0">
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in products"
          :id="`${item.code}`"
          :key="`${i}-${item.name}`"
          class="mb-2"
          @click="commerce.can_order ? openSelectedItemDialog(item.id) : ''"
        >
          <v-list-item-avatar v-if="item.avatar_dirname" rounded>
            <v-img
              :src="`${item.avatar_dirname}${item.avatar ? item.avatar : ''}`"
              :class="{ disabled: item.disabled }"
              @click="!commerce.can_order ? showImageDialog(item) : ''"
            >
              <div
                v-if="item.disabled"
                class="fill-height d-flex flex-column justify-center"
              >
                <v-chip x-small class="ma-2" color="red" text-color="white">
                  {{ $t('product.disabled') }}
                </v-chip>
              </div>
            </v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>

            <v-list-item-subtitle>
              <v-tooltip v-if="!commerce.can_order" bottom close-delay="500">
                <template #activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    v-on="on"
                    v-html="item.description"
                  ></span>
                </template>
                <span v-html="item.description"></span>
              </v-tooltip>
              <span v-else v-html="item.description"></span>
            </v-list-item-subtitle>

            <div>
              <span
                v-if="item.price && !item.product_prices.length"
                class="mt-1 text-body-2"
                >{{ commerce.currency ? ' ' + commerce.currency.symbol : ''
                }}{{ item.price.toFixed(2) }}</span
              >

              <v-menu
                v-if="
                  item.product_prices.length && commerce.name === 'vape-street'
                "
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-btn small depressed class="mt-1" v-bind="attrs" v-on="on">
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
                    <v-list-item-title>{{ price.name }}</v-list-item-title>
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
                  {{ commerce.currency ? ' ' + commerce.currency.symbol : ''
                  }}{{ price.price.toFixed(2) }}
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
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['commerce']),
  },
  methods: {
    openSelectedItemDialog(id) {
      this.$emit('onOpenSelectedItemDialog', id)
    },
    showImageDialog(item) {
      this.$emit('onShowImageDialog', item)
    },
    scrollTo(hashtag) {
      const el = document.querySelector(hashtag)
      if (el) {
        window.scrollTo(0, el.offsetTop)
      }
    },
  },
}
</script>

<style lang="scss">
#commerce-products-list .v-list {
  .v-avatar.v-list-item__avatar {
    height: 100px !important;
    min-width: 100px !important;
    width: 100px !important;
  }

  .v-list-item__title {
    -webkit-line-clamp: 2;
    white-space: initial;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
}
</style>
