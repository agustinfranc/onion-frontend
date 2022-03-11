<template>
  <v-card>
    <v-card-title class="text-h5"> Elegí un método de pago </v-card-title>

    <v-card-text>
      <v-list nav two-line>
        <v-list-item-group
          v-model="selected"
          active-class="active-item--custom"
          color="primary"
        >
          <v-list-item v-for="payMethod in payMethods" :key="payMethod.id">
            <v-list-item-content>
              <v-list-item-title>
                {{ payMethod.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="payMethod.subtitle">
                {{ payMethod.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-btn
        block
        color="success"
        class="mt-4"
        :disabled="selected === undefined"
        @click="select"
      >
        Confirmar
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selected: undefined,
      payMethods: [
        {
          id: 1,
          name: 'Efectivo',
        },
        {
          id: 2,
          name: 'MercadoPago',
          subtitle: 'Dinero en cuenta, Tarjeta de Débito, Tarjeta de Crédito',
        },
      ],
    }
  },
  methods: {
    async select() {
      await this.$store.dispatch(
        'savePayMethod',
        this.payMethods[this.selected]
      )
      this.$emit('onSubmit')
    },
  },
}
</script>

<style lang="scss">
.active-item--custom {
  border: thin solid currentColor;
}
</style>
