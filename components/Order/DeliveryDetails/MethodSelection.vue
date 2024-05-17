<template>
  <v-card>
    <v-card-title class="text-h5"> Metodo de entrega </v-card-title>

    <v-card-text>
      <v-list nav two-line>
        <v-list-item-group
          v-model="selected"
          @change="(value) => updateSelectedOption(value)"
          active-class="active-item--custom"
          color="primary"
        >
          <v-list-item
            v-for="method in deliveryMethods"
            :key="method.id"
            :disabled="method.disabled"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ method.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-select
          v-if="withTimeOptions"
          v-model="selectedTimeOption"
          class="mt-3 px-3"
          label="Seleccionar franja horaria de retiro"
          :items="items"
        ></v-select>
      </v-list>

      <v-btn
        block
        color="success"
        class="mt-4"
        :disabled="isConfirmDisabled"
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
      selectedTimeOption: undefined,
    }
  },
  computed: {
    ...mapState(['order']),

    items() {
      return this.order.branch?.commerce_branch_order_time_options
        .filter((item) => !item.disabled)
        .map((item) => `${item.start_time} - ${item.end_time}`)
    },

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

    isConfirmDisabled() {
      if (this.selected === undefined) return true

      if (this.selected === 0) return false

      if (this.withTimeOptions) {
        return !this.selectedTimeOption
      }

      return false
    },

    withTimeOptions() {
      return this.selected === 1 && this.isVogliamoDel
    },

    isVogliamoDel() {
      return this.order.branch?.name === 'vogliamo-del'
    },
  },

  methods: {
    async select() {
      await this.$store.dispatch('saveDeliveryMethod', {
        ...this.deliveryMethods[this.selected],
        selectedTimeOption: this.selectedTimeOption,
      })
      this.$emit('onSubmit')
    },

    updateSelectedOption(value) {
      if (value === 0) {
        this.selectedTimeOption = undefined
      }
    },
  },
}
</script>

<style lang="scss">
.active-item--custom {
  border: thin solid currentColor;
}
</style>
