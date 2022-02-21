<template>
  <div class="overflow-y-auto">
    <template v-if="commerce && commerce.name">
      <CommerceTitle />
    </template>

    <div style="position: relative">
      <template v-if="rubros">
        <CommerceCategoriesHeader />
      </template>

      <CommerceCategories :rubros="rubros" />

      <CommerceProducts />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commerce: {
      type: Object,
      required: true,
    },
    rubros: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
div.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
</style>
