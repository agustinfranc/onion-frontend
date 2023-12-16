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
      if (
        !this.cart.length ||
        !this.order.branch ||
        !this.order.deliveryMethod
      ) {
        return true
      }

      if (this.order.deliveryMethod.id === 1) {
        return !this.order.address.address
      }

      return false
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
