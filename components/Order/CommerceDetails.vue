<template>
  <v-card>
    <v-card-title class="justify-space-between">
      <span>Comercio</span>
      <v-btn depressed>Cambiar</v-btn>
    </v-card-title>

    <v-card-text class="d-flex align-center">
      <v-img
        max-width="64"
        max-height="64"
        rounded
        class="rounded mr-3"
        :src="commerce.cover_dirname"
      ></v-img>
      <div>
        <h3>Desembarco</h3>
        <h4>Echeverria 600, Acassuso</h4>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['commerce']),
  },
}
</script>
