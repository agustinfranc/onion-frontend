<template>
  <v-list nav>
    <v-list-item-group color="primary">
      <v-list-item v-for="item in items" :key="item.id" class="mb-2">
        <v-list-item-avatar v-if="item.avatar_dirname">
          <v-img
            :src="`${item.avatar_dirname}${item.avatar ? item.avatar : ''}`"
          >
          </v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>

          <!-- <v-list-item-subtitle></v-list-item-subtitle> -->

          <div>
            <span class="mt-1 text-body-2"
              >{{ commerce.currency ? commerce.currency.symbol : '$'
              }}{{ item.price }}</span
            >
          </div>
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
}
</script>
