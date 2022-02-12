<template>
  <div class="theme--parent">
    <div class="container py-1">
      <v-chip-group column>
        <v-chip
          v-for="rubro in rubrosFiltered"
          :key="rubro.name"
          :color="rubro.pivot.highlighted ? 'orange' : ''"
        >
          <nuxt-link
            :to="`#${rubro.link_name}`"
            @click.native="scrollTo(`#${rubro.link_name}`)"
          >
            <span class="v-chip__personalized">{{ rubro.name }}</span>
          </nuxt-link>
        </v-chip>
      </v-chip-group>
    </div>

    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    rubros: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['rubrosFiltered']),
  },
  methods: {
    scrollTo(hashtag) {
      const el = document.getElementById(this.$route.hash.slice(1))
      if (el) {
        window.scrollTo(0, el.offsetTop)
      }
    },
  },
}
</script>

<style scoped>
div.theme--parent {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
