<template>
  <div class="h-100">
    <Product :commerce="commerce" :item="item" :loading="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      item: {},
      loading: false,
    }
  },
  async fetch() {
    this.loading = true

    try {
      const url = `${this.$nuxt.context.env.apiUrl}products/${this.$route.params.product}`
      const res = await this.$axios.$get(url)
      this.item = res
    } catch (error) {
      console.error('Error:', error)
    }

    this.loading = false
  },
  fetchOnServer: false,

  computed: {
    ...mapState(['commerce']),
  },
}
</script>
