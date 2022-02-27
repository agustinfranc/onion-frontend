<template>
  <v-card>
    <v-card-title class="text-h5"> Dirección de entrega </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="address"
          :rules="addressRules"
          label="Dirección"
          required
        ></v-text-field>
        <v-text-field
          v-model="floor"
          :rules="floorRules"
          label="Piso/Departamento"
          required
        ></v-text-field>
        <v-text-field
          v-model="description"
          :rules="descriptionRules"
          label="Instrucción para la entrega"
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
      address: '',
      floor: '',
      description: '',
      addressRules: [
        (v) => !!v || 'Address is required',
        (v) => v.length <= 100 || 'Address must be less than 100 characters',
      ],
      floorRules: [
        (v) => v.length <= 10 || 'Floor must be less than 10 characters',
      ],
      descriptionRules: [
        (v) =>
          v.length <= 100 || 'Description must be less than 100 characters',
      ],
    }
  },
  methods: {
    async validate() {
      this.$refs.form.validate()
      await this.saveAddress({
        address: this.address,
        floor: this.floor,
        description: this.description,
      })
      this.$emit('onSubmit')
    },
    async saveAddress(addressDetails) {
      await this.$store.dispatch('saveAddress', addressDetails)
    },
  },
}
</script>
