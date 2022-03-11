<template>
  <v-speed-dial
    v-if="
      commerce.has_action_buttons &&
      (commerce.whatsapp_number ||
        commerce.phone_number ||
        commerce.instagram_account)
    "
    v-model="fab"
    fixed
    bottom
    right
    transition="slide-y-reverse-transition"
    style="bottom: 48px"
  >
    <template #activator>
      <v-btn v-model="fab" color="blue darken-2" fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-account-voice </v-icon>
      </v-btn>
    </template>

    <v-btn
      v-if="commerce.whatsapp_number"
      fab
      small
      color="green"
      :href="`https://wa.me/${commerce.whatsapp_number}`"
      target="_blank"
    >
      <v-icon>mdi-whatsapp</v-icon>
    </v-btn>

    <v-btn
      v-if="commerce.phone_number"
      fab
      small
      color="green"
      :href="`tel:${commerce.phone_number}`"
    >
      <v-icon>mdi-phone</v-icon>
    </v-btn>

    <v-btn
      v-if="commerce.instagram_account"
      fab
      small
      color="purple"
      :href="`https://www.instagram.com/${commerce.instagram_account}`"
      target="_blank"
    >
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  props: {
    commerce: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fab: false,
    }
  },
}
</script>
