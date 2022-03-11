<template>
  <v-app-bar dense flat>
    <v-btn small icon nuxt :to="to" class="ml-0">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #121212;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #f2f2f2;
}
</style>
