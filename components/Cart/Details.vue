<template>
  <div>
    <v-container class="d-flex justify-space-between">
      <span>Subtotal:</span>
      <span>${{ subtotalCalc }}</span>
    </v-container>

    <v-card>
      <v-card-title>¿Necesitas aclarar algo?</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="note"
          label="Notas al pedido"
          counter
          rows="1"
          @change="setOrderNote"
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
        (previous, current) => previous + current.price * current.quantity,
        0
      )
    },
  },
  methods: {
    setOrderNote(note) {
      this.$store.dispatch('saveOrderNote', note)
    },
  },
}
</script>
