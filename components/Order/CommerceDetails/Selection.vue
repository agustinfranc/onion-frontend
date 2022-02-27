<template>
  <v-card>
    <v-card-title class="text-h5"> Elegí una sucursal </v-card-title>

    <v-card-text>
      <v-list nav two-line>
        <v-list-item-group
          v-model="selected"
          active-class="active-item--custom"
          color="primary"
        >
          <v-list-item v-for="branch in commerce.branches" :key="branch.id">
            <v-list-item-content>
              <v-list-item-title>
                {{ branch.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ branch.address }}
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
    ...mapState(['commerce']),
  },
  methods: {
    async select() {
      await this.$store.dispatch(
        'saveCommerceBranch',
        this.commerce.branches[this.selected]
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
