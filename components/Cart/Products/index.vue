<template>
  <CartProductsList :items="cart" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
  },
}
</script>
