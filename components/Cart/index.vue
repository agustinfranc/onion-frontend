<template>
  <v-container class="d-flex flex-column" :style="calcContainerHeight">
    <CartTitle />

    <CartProducts />

    <hr class="mb-3" />

    <CartDetails />

    <CartActionButton />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['commerce']),
    calcContainerHeight() {
      return this.commerce.has_footer
        ? 'height: calc(100vh - 40px)'
        : 'height: 100vh'
    },
  },
}
</script>
