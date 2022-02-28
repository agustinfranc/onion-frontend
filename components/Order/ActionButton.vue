<template>
  <v-container>
    <v-btn large block color="primary" :disabled="disabled" @click="submitOrder"
      >Hacer pedido ${{ subtotalCalc }}</v-btn
    >
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { OrderService } from '@/services/order.service'

export default {
  computed: {
    ...mapState(['commerce', 'cart', 'order']),
    disabled() {
      return (
        !this.cart.length ||
        !this.order.branch.name ||
        !this.order.address.address
      )
    },
    // TODO: solucionar: repito codigo de components/Cart/Details
    subtotalCalc() {
      return this.cart.reduce(
        (previous, current) => previous + current.price * current.quantity,
        0
      )
    },
  },
  methods: {
    submitOrder() {
      OrderService.sendOrder({
        commerce: this.commerce,
        cart: this.cart,
        order: this.order,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 40px;
  left: 0;
  background: inherit;
}
</style>
