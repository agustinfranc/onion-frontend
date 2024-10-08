<template>
  <div>
    <template v-if="$fetchState.pending">
      <CommerceSkeleton />
    </template>

    <CommerceBody
      :commerce="commerce"
      :rubros="rubros"
      style="padding-bottom: 68px"
    />

    <CommerceCartButton v-if="cart.length" />

    <ActionButton :commerce="commerce" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  async asyncData({ $axios, params, env, error, store }) {
    if (store.state.commerce && store.state.commerce.rubros) {
      return { commerceData: store.state.commerce, params }
    }

    try {
      const url = `${env.apiUrl}${params.commerce}?simplified=true`

      const commerceData = await $axios.$get(url)

      return { commerceData, params }
    } catch (e) {
      if (e.response) {
        return error({
          statusCode: e.response.status,
          messaage: e.messaage,
        })
      }
    }
  },

  data() {
    return {
      rubros: [],
      params: null,
    }
  },

  async fetch() {
    if (this.$store.state.commerce && this.$store.state.commerce.rubros) {
      this.rubros = this.$store.state.commerce.rubros
      return
    }

    await this.$store.dispatch('saveTitle', this.$route.params.commerce)

    try {
      const url = this.$nuxt.context.env.apiUrl + this.$route.params.commerce

      const res = await this.$axios.$get(url)

      this.$vuetify.theme.dark = res.dark_theme

      await this.$store.dispatch('saveData', res)

      this.rubros = res.rubros
    } catch (error) {
      console.error('Error:', error)
    }
  },

  head() {
    return {
      title: `${this.commerceData.fullname} | Onion`,
      titleTemplate: `${this.commerceData.fullname} | Onion`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.commerceData.fullname} ${this.$t(
            '| Access to our digital menu | Developed by Onion'
          )}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.commerceData.fullname} | Onion`,
        },
        {
          hid: 'og:host',
          property: 'og:host',
          content: `https://onion.ar/${this.commerceData.name}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://onion.ar/${this.commerceData.name}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.commerceData.cover_dirname,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.commerceData.fullname} ${this.$t(
            '| Access to our digital menu | Developed by Onion'
          )}`,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://onion.ar/${this.commerceData.name}`,
        },
      ],
    }
  },
  fetchOnServer: false,

  computed: {
    ...mapState(['commerce', 'cart']),
    ...mapGetters(['rubrosFiltered']),
    calcContainerHeight() {
      return this.commerce.has_footer
        ? 'height: calc(100vh - 40px)'
        : 'height: 100vh'
    },
  },

  mounted() {
    if (this.$route.hash) {
      setTimeout(() => this.scrollTo(this.$route.hash), 500)
    }
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

<style>
.theme--dark.v-application .theme--parent,
.theme--dark.v-application .v-main__wrap,
.theme--dark.v-application .v-main__wrap .background-default {
  background: #121212;
  color: #ffffff;
}

.theme--light.v-application .theme--parent,
.theme--light.v-application .v-main__wrap,
.theme--light.v-application .v-main__wrap .background-default {
  background: #f2f2f2;
  color: rgba(0, 0, 0, 0.87);
}

.v-chip.v-size--default.v-chip-h--inherit {
  height: inherit;
}
</style>
