<template>
  <v-card>
    <v-card-title class="justify-space-between">
      <span>Método de pago</span>
      <OrderSelectionButton
        :highlight="!!order.payMethod.name"
        :highlight-text="'Seleccionar'"
        :disabled="!order.branch.id"
        @click="setPayMethod"
      />
    </v-card-title>

    <v-card-text class="d-flex align-center">
      <v-icon large class="mr-3"> mdi-cash-multiple </v-icon>
      <div v-if="order.payMethod.name">
        <h3>{{ order.payMethod.name }}</h3>
      </div>
      <div v-else>
        <h3>...</h3>
      </div>
    </v-card-text>

    <v-dialog v-model="selectionDialog">
      <OrderPayMethodSelection @onSubmit="closeSelectionDialog" />
    </v-dialog>
  </v-card>
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
    setPayMethod() {
      this.selectionDialog = true
    },
    closeSelectionDialog() {
      this.selectionDialog = false
    },
  },
}
</script>
