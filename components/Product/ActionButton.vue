<template>
  <v-container class="px-2 background-default">
    <v-btn
      large
      block
      color="primary"
      :disabled="disabled || loading"
      @click="$emit('addToCart')"
      >{{ $t('Agregar al pedido') }}</v-btn
    >
  </v-container>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 40px;
  left: 0;
}
</style>
