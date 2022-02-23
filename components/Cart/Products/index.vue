<template>
  <div class="overflow-y-auto">
    <CartProductsList :items="cart" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
  },
}
</script>
