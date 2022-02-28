<template>
  <div>
    <CartHeader />

    <v-container class="d-flex flex-column" :style="calcContainerHeight">
      <CartProducts />

      <v-divider class="mb-3"></v-divider>

      <CartDetails />

      <CartActionButton />
    </v-container>
  </div>
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
