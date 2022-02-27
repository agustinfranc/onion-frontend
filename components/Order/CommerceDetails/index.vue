<template>
  <div>
    <v-card>
      <v-card-title class="justify-space-between">
        <span>Sucursal</span>
        <OrderSelectionButton
          v-if="commerce.branches && commerce.branches.length"
          :highlight="!!order.branch.name"
          :highlight-text="'Seleccionar'"
          @click="selectCommerce"
        />
      </v-card-title>

      <v-card-text class="d-flex align-center">
        <v-img
          max-width="64"
          max-height="64"
          rounded
          class="rounded mr-3"
          :src="commerce.cover_dirname"
        ></v-img>
        <div v-if="order.branch.name">
          <h3>{{ order.branch.name }}</h3>
          <h4 v-if="order.branch.address">{{ order.branch.address }}</h4>
        </div>
        <div v-else>
          <h3>...</h3>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="selectionDialog">
      <OrderCommerceDetailsSelection @onSubmit="closeSelectionDialog" />
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
    ...mapState(['commerce', 'order']),
  },
  methods: {
    selectCommerce() {
      this.selectionDialog = true
    },
    closeSelectionDialog() {
      this.selectionDialog = false
    },
  },
}
</script>
