<template>
  <v-list nav>
    <v-list-item-group color="primary">
      <v-list-item v-for="(item, index) in cart" :key="index" class="mb-2">
        <v-list-item-avatar v-if="item.avatar_dirname" rounded>
          <v-img
            :src="`${item.avatar_dirname}${item.avatar ? item.avatar : ''}`"
          >
          </v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>

          <v-list-item-subtitle>
            <div class="d-flex justify-space-between">
              <div>
                <span class="mt-1 text-body-2"
                  >{{ commerce.currency ? commerce.currency.symbol + ' ' : '$'
                  }}{{ item.price }}</span
                >
                <template v-if="item.options">
                  <p
                    v-for="option in item.options"
                    :key="`option_${option.id}`"
                    class="mb-0 text-body-2"
                  >
                    {{ option.name }}
                  </p>
                </template>
              </div>

              <div>
                <!-- Estoy repitiendo codigo de components/Product -->
                <v-btn-toggle class="mr-2">
                  <v-btn fab x-small @click.stop="removeOneItem(item, index)">
                    <v-icon v-if="item.quantity > 1">mdi-minus</v-icon>
                    <v-icon v-else>mdi-delete</v-icon>
                  </v-btn>

                  <v-btn fab x-small>
                    <span>{{ item.quantity }}</span>
                  </v-btn>

                  <v-btn fab x-small @click.stop="addOneItem(item, index)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </div>
            </div>
          </v-list-item-subtitle>

          <v-list-item-subtitle>{{ item.note }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['commerce', 'cart']),
  },
  methods: {
    async addOneItem(item, index) {
      await this.$store.dispatch('updateCart', {
        item: {
          ...item,
          quantity: item.quantity + 1,
        },
        index,
      })
    },
    async removeOneItem(item, index) {
      if (item.quantity > 1) {
        await this.$store.dispatch('updateCart', {
          item: {
            ...item,
            quantity: item.quantity - 1,
          },
          index,
        })
        return
      }

      await this.$store.dispatch('removeFromCart', { item, index })
    },
  },
}
</script>
