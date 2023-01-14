<template>
  <v-card>
    <v-card-title class="text-h5"> Tus datos </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombre y apellido"
          required
        ></v-text-field>
        <v-btn
          block
          color="success"
          class="mr-4"
          :disabled="!valid"
          @click="validate"
        >
          Confirmar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 100 || 'Name must be less than 200 characters',
      ],
    }
  },
  methods: {
    async validate() {
      this.$refs.form.validate()
      await this.save({
        name: this.name,
      })
      this.$emit('onSubmit')
    },

    async save(clientDetails) {
      await this.$store.dispatch('saveClient', clientDetails)
    },
  },
}
</script>
