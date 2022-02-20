<template>
  <div class="d-flex flex-column h-100">
    <v-card :loading="loading">
      <template slot="progress">
        <v-progress-linear
          color="blue"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="150"
        :src="`${item.avatar_dirname}${item.avatar ? item.avatar : ''}`"
        :class="{ disabled: item.disabled }"
      ></v-img>

      <v-card-title>{{ item.name }}</v-card-title>

      <v-card-text>
        <div class="my-4 text-subtitle-1">
          <span class="font-weight-bold"> ${{ item.price }} </span>
        </div>

        <div>
          {{ item.description }}
        </div>
      </v-card-text>
    </v-card>

    <v-container class="d-flex flex flex-column justify-space-between">
      <v-card class="mb-4">
        <div class="d-flex justify-space-between align-center">
          <v-card-title>Unidades</v-card-title>

          <div class="mr-2">
            <v-btn-toggle>
              <v-btn fab small @click="removeOneItem">
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <v-btn fab small>
                <span class="text-h6">{{ quantity }}</span>
              </v-btn>

              <v-btn fab small @click="addOneItem">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </v-card>

      <v-card class="mb-auto">
        <v-card-title>¿Necesitas aclarar algo?</v-card-title>
        <v-card-text>
          <v-textarea
            :value="note"
            name="input-7-1"
            label="Notas al producto"
            counter
            rows="1"
          ></v-textarea>
        </v-card-text>
      </v-card>

      <v-btn large color="primary" :disabled="disabled"
        >Agregar al pedido</v-btn
      >
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      note: null,
      quantity: 0,
    }
  },
  computed: {
    disabled() {
      return !this.quantity
    },
  },
  methods: {
    addOneItem() {
      ++this.quantity
    },
    removeOneItem() {
      if (!this.quantity) return

      --this.quantity
    },
  },
}
</script>
