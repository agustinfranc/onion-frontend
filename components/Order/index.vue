<template>
  <div>
    <OrderHeader />

    <v-container class="d-flex flex-column" :style="calcContainerHeight">
      <OrderCommerceDetails class="mb-3" />

      <OrderDeliveryDetails class="mb-3" />

      <OrderPayMethod class="mb-auto" />

      <OrderActionButton />
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
