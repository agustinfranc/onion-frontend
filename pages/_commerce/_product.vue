<template>
  <div class="h-100">
    <CommerceProduct :item="item" />
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      item: {},
    }
  },
  async fetch() {
    try {
      const url = `${this.$nuxt.context.env.apiUrl}products/${this.$route.params.product}`
      const res = await this.$axios.$get(url)
      this.item = res
    } catch (error) {
      console.error('Error:', error)
    }
  },
  fetchOnServer: false,
}
</script>
