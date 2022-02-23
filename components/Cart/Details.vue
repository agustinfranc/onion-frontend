<template>
  <v-container class="d-flex justify-space-between mb-auto">
    <span>Subtotal:</span>
    <span>${{ subtotalCalc }}</span>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
    subtotalCalc() {
      return this.cart.reduce(
        (previous, current) => previous + current.price,
        0
      )
    },
  },
}
</script>
