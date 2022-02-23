<template>
  <div class="mb-auto">
    <v-container class="d-flex justify-space-between">
      <span>Subtotal:</span>
      <span>${{ subtotalCalc }}</span>
    </v-container>

    <v-card>
      <v-card-title>¿Necesitas aclarar algo?</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="note"
          name="input-7-1"
          label="Notas al pedido"
          counter
          rows="1"
        ></v-textarea>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      note: null,
    }
  },
  computed: {
    ...mapState(['cart']),
    subtotalCalc() {
      return this.cart.reduce(
        (previous, current) => previous + current.price,
        0
      )
    },
  },
}
</script>
