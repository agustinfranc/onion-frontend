<template>
  <v-dialog v-model="show">
    <v-img
      v-if="dialog.show"
      :lazy-src="dialog.imgLazySrc"
      :src="dialog.imgSrc"
    >
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>

        <v-btn color="black" icon @click.stop="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row> </template
    ></v-img>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    dialog: {
      type: Object,
      required: true,
    },
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
