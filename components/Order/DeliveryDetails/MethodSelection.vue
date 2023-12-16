<template>
  <v-card>
    <v-card-title class="text-h5"> Metodo de entrega </v-card-title>

    <v-card-text>
      <v-list nav two-line>
        <v-list-item-group
          v-model="selected"
          active-class="active-item--custom"
          color="primary"
        >
          <v-list-item
            v-for="payMethod in deliveryMethods"
            :key="payMethod.id"
            :disabled="payMethod.disabled"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ payMethod.name }}
              </v-list-item-title>
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
    deliveryMethods() {
      return [
        {
          id: 1,
          name: 'Delivery a domicilio',
          disabled: !this.order.branch?.has_delivery,
        },
        {
          id: 2,
          name: 'Retiro en el local',
          disabled: !this.order.branch?.has_takeaway,
        },
      ]
    },
  },
  methods: {
    async select() {
      await this.$store.dispatch(
        'saveDeliveryMethod',
        this.deliveryMethods[this.selected]
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
