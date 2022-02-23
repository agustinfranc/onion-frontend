<template>
  <v-list nav>
    <v-list-item-group color="primary">
      <v-list-item v-for="(item, index) in items" :key="index" class="mb-2">
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
              <span class="mt-1 text-body-2"
                >{{ commerce.currency ? commerce.currency.symbol : '$'
                }}{{ item.price }}</span
              >

              <!-- Estoy repitiendo codigo de components/Product -->
              <v-btn-toggle class="mr-2">
                <v-btn fab x-small @click="removeOneItem">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>

                <v-btn fab x-small>
                  <span>{{ item.quantity }}</span>
                </v-btn>

                <v-btn fab x-small @click="addOneItem">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['commerce']),
  },
  methods: {
    removeOneItem() {
      //
    },
    addOneItem() {
      //
    },
  },
}
</script>
