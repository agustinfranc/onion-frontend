<template>
  <div>
    <v-card>
      <v-card-title class="justify-space-between">
        <span>Dirección de entrega</span>
        <OrderSelectionButton
          :highlight="!!order.address.address"
          @click="setAddress"
        />
      </v-card-title>

      <v-card-text class="d-flex align-center">
        <v-img
          max-width="64"
          max-height="64"
          rounded
          class="rounded mr-3"
          src="/img/location.jpeg"
        ></v-img>
        <div>
          <h3>{{ order.address.address ? order.address.address : '...' }}</h3>
          <h4 v-if="order.address.floor">{{ order.address.floor }}</h4>
          <h4 v-if="order.address.description">
            {{ order.address.description }}
          </h4>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="selectionDialog">
      <OrderDeliveryDetailsSelection @onSubmit="closeSelectionDialog" />
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
    setAddress() {
      this.selectionDialog = true
    },
    closeSelectionDialog() {
      this.selectionDialog = false
    },
  },
}
</script>
