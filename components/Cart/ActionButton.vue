<template>
  <v-container>
    <v-btn
      large
      block
      color="primary"
      nuxt
      :to="{ name: 'commerce-order___es' }"
      :disabled="!cart.length"
      >Continuar</v-btn
    >
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
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
