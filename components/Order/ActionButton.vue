<template>
  <div>
    <v-btn large block color="primary" :disabled="!cart.length"
      >Hacer pedido ${{ subtotalCalc }}</v-btn
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
    // repito codigo de components/Cart/Details
    subtotalCalc() {
      return this.cart.reduce(
        (previous, current) => previous + current.price * current.quantity,
        0
      )
    },
  },
}
</script>
