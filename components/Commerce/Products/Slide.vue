<template>
  <v-container>
    <v-slide-group v-model="selected">
      <v-slide-item v-for="item in products" :key="`${item.id}-carousel`">
        <v-card
          class="ma-2"
          min-height="370"
          width="224"
          max-width="400"
          @click="commerce.can_order ? openSelectedItemDialog(item.id) : ''"
        >
          <v-img
            v-if="item.avatar_dirname"
            class="white--text align-end"
            :class="{ disabled: item.disabled }"
            height="200px"
            :src="`${item.avatar_dirname}${item.avatar ? item.avatar : ''}`"
            @click="!commerce.can_order ? showImageDialog(item) : ''"
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
                >{{ commerce.currency ? commerce.currency.symbol + ' ' : ''
                }}{{ item.price.toFixed(2) }}</span
              >

              <v-chip
                v-for="price in item.product_prices"
                :key="price.name"
                class="v-chip-h--inherit ma-1 text-center"
                outlined
                label
              >
                <span v-if="price.name" class="mr-3"
                  >{{ price.name ? price.name + ' ' : '' }}
                </span>
                <span v-if="price.price">
                  {{ commerce.currency ? commerce.currency.symbol + ' ' : ''
                  }}{{ price.price.toFixed(2) }}
                </span>
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
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
  data() {
    return {
      selected: null,
    }
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
