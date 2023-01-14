<template>
  <div>
    <v-card>
      <v-card-title class="justify-space-between">
        <span>Tus datos</span>
        <OrderSelectionButton
          :highlight="!!order.client.name"
          @click="setClient"
        />
      </v-card-title>

      <v-card-text class="d-flex align-center">
        <div>
          <h3>{{ order.client.name ?? '...' }}</h3>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="selectionDialog">
      <OrderPersonalDetailsSelection @onSubmit="closeSelectionDialog" />
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectionDialog: false,
    }
  },
  computed: {
    ...mapState(['order']),
  },
  methods: {
    setClient() {
      this.selectionDialog = true
    },
    closeSelectionDialog() {
      this.selectionDialog = false
    },
  },
}
</script>
