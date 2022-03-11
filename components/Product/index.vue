<template>
  <div class="d-flex flex-column" :style="calcContainerHeight">
    <v-card :loading="loading">
      <template slot="progress">
        <v-progress-linear
          color="blue"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="150"
        :src="`${item.avatar_dirname}${item.avatar ? item.avatar : ''}`"
        :class="{ disabled: item.disabled }"
      >
        <v-app-bar flat color="transparent">
          <v-btn small fab nuxt :to="{ name: 'commerce___es' }">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-app-bar></v-img
      >

      <v-card-title>{{ item.name }}</v-card-title>

      <v-card-text>
        <div class="text-subtitle-1">
          <span class="font-weight-bold"> ${{ item.price }} </span>
        </div>

        <div>
          {{ item.description }}
        </div>
      </v-card-text>
    </v-card>

    <v-container class="d-flex flex flex-column overflow-y-auto">
      <v-card class="mb-4">
        <div class="d-flex justify-space-between align-center">
          <v-card-title>Unidades</v-card-title>

          <div class="mr-2">
            <v-btn-toggle>
              <v-btn fab small @click="removeOneItem">
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <v-btn fab small>
                <span class="text-h6">{{ quantity }}</span>
              </v-btn>

              <v-btn fab small @click="addOneItem">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </v-card>

      <v-card class="mb-auto">
        <v-card-title>¿Necesitas aclarar algo?</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="note"
            label="Notas al producto"
            counter
            rows="1"
          ></v-textarea>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <v-btn
        large
        block
        color="primary"
        :disabled="disabled || loading"
        @click="addToCart"
        >Agregar al pedido</v-btn
      >
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    commerce: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      note: null,
      quantity: 1,
    }
  },
  computed: {
    disabled() {
      return !this.quantity
    },
    calcContainerHeight() {
      return this.commerce.has_footer
        ? 'height: calc(100vh - 40px)'
        : 'height: 100vh'
    },
  },
  methods: {
    addOneItem() {
      ++this.quantity
    },
    removeOneItem() {
      if (!this.quantity) return

      --this.quantity
    },
    async addToCart() {
      await this.$store.dispatch('addToCart', {
        ...this.item,
        quantity: this.quantity,
        note: this.note,
      })

      this.$router.push({ name: 'commerce___es' })
    },
  },
}
</script>
