<template>
  <v-btn
    depressed
    :disabled="disabled"
    :color="highlight ? 'light' : 'success'"
    @click="$emit('click')"
    >{{ highlight ? 'Cambiar' : highlightText }}</v-btn
  >
</template>

<script>
export default {
  props: {
    highlight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    highlightText: {
      type: String,
      default: 'Ingresar',
    },
  },
}
</script>
