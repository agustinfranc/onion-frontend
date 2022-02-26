<template>
  <div>
    <div
      v-for="rubro in rubrosFiltered"
      :id="rubro.link_name"
      :key="rubro.name"
      class="background-default"
    >
      <v-container :key="rubro.name">
        <h3>{{ rubro.name }}</h3>
      </v-container>

      <div class="px-3">
        <v-divider></v-divider>
      </div>

      <template v-for="(subrubro, index) in rubro.subrubros">
        <v-container
          v-if="!subrubro.is_general"
          :id="subrubro.link_name"
          :key="subrubro.name"
        >
          <span>{{ subrubro.name }}</span>
        </v-container>

        <!-- Lists -->
        <CommerceProductsList
          v-if="!subrubro.commerces[0].pivot.slideable"
          :key="index"
          :products="subrubro.products"
          @onOpenSelectedItemDialog="openSelectedItemDialog"
          @onShowImageDialog="showImageDialog"
        />

        <!-- Slides -->
        <CommerceProductsSlide
          v-if="subrubro.commerces[0].pivot.slideable"
          :key="index"
          :products="subrubro.products"
          @onOpenSelectedItemDialog="openSelectedItemDialog"
          @onShowImageDialog="showImageDialog"
        />
      </template>
    </div>

    <ImageDialog v-model="imageDialog.show" :dialog="imageDialog" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      imageDialog: {
        show: false,
        imgSrc: '',
        imgLazySrc: 'https://picsum.photos/id/11/10/6',
      },
    }
  },
  computed: {
    ...mapState(['commerce']),
    ...mapGetters(['rubrosFiltered']),
  },
  methods: {
    showImageDialog(item) {
      if (!item.avatar_dirname) return

      this.imageDialog.imgSrc = item.avatar_dirname + item.avatar
      this.imageDialog.show = true
    },
    openSelectedItemDialog(id) {
      if (typeof id !== 'number') return

      this.$router.push({ path: `/${this.commerce.name}/${id}` })
    },
  },
}
</script>
