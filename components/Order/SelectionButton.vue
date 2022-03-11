<template>
  <v-btn
    depressed
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
    highlightText: {
      type: String,
      default: 'Ingresar',
    },
  },
}
</script>
