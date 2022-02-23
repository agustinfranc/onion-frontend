<template>
  <div>
    <v-btn large block color="primary" :disabled="!cart.length"
      >Continuar</v-btn
    >
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
