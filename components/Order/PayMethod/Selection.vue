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
          <v-list-item
            v-for="payMethod in payMethods"
            :key="payMethod.id"
            :disabled="payMethod.disabled"
          >
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selected: undefined,
    }
  },
  computed: {
    ...mapState(['order']),
    payMethods() {
      return [
        {
          id: 1,
          name: 'Efectivo',
          disabled: false,
        },
        {
          id: 2,
          name: 'MercadoPago',
          subtitle: 'Dinero en cuenta, Tarjeta de Débito, Tarjeta de Crédito',
          disabled: !this.order.branch?.mp_enabled,
        },
      ]
    },
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
