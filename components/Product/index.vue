<template>
  <div class="d-flex flex-column" :style="calcContainerHeight">
    <v-card :loading="loading">
      <template slot="progress">
        <v-progress-linear
          color="blue"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <div v-if="item.youtube_id" id="youtube-iframe">
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${item.youtube_id}`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <v-img
        v-if="!item.youtube_id"
        height="150"
        :src="`${item.avatar_dirname}${item.avatar ? item.avatar : ''}`"
        :class="{ disabled: item.disabled }"
      >
        <v-app-bar flat color="transparent">
          <v-btn small fab nuxt :to="{ name: 'commerce___es' }">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-app-bar></v-img
      >

      <v-card-title>{{ item.name }}</v-card-title>

      <v-card-text>
        <div class="text-subtitle-1">
          <span class="font-weight-bold"> ${{ item.price }} </span>
        </div>

        <div class="description-container">
          <span v-html="item.description"></span>
        </div>
      </v-card-text>
    </v-card>

    <v-container class="d-flex flex flex-column overflow-y-auto">
      <v-card class="mb-4">
        <div class="d-flex justify-space-between align-center">
          <v-card-title>Unidades</v-card-title>

          <div class="mr-2">
            <v-btn-toggle>
              <v-btn fab small @click="removeOneItem">
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <v-btn fab small>
                <span class="text-h6">{{ quantity }}</span>
              </v-btn>

              <v-btn fab small @click="addOneItem">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </v-card>

      <!-- Options -->
      <template v-if="item.product_options_groupes">
        <v-card
          v-for="groupe in item.product_options_groupes"
          :key="`groupe_${groupe.id}`"
          class="mb-4"
        >
          <v-card-title>{{ groupe.name }}</v-card-title>
          <v-card-subtitle>
            {{ groupe.description }}
          </v-card-subtitle>

          <v-card-text>
            <v-form v-model="valid">
              <!-- To select just one item -->
              <template v-if="groupe.required">
                <v-radio-group v-model="form[groupe.id]">
                  <v-radio
                    v-for="option in groupe.product_options"
                    :key="`option_${option.id}`"
                    :label="option.name"
                    :value="option"
                  ></v-radio>
                </v-radio-group>
              </template>

              <!-- To select multiple items -->
              <template v-else-if="groupe.multiple">
                <v-checkbox
                  v-for="option in groupe.product_options"
                  :key="`option_${option.id}`"
                  :label="option.name"
                  :value="option"
                  @change="(item) => onChangeCheckbox(item, option)"
                ></v-checkbox>
              </template>

              <!-- To select the number of items. Usefull for products like docena de empanadas -->
              <template v-else-if="groupe.countable">
                <template v-for="option in groupe.product_options">
                  <div
                    :key="`option_${option.id}`"
                    class="d-flex justify-space-between mb-2"
                  >
                    <span>{{ option.name }}</span>

                    <v-btn-toggle>
                      <v-btn fab x-small @click="removeOneOption(option)">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <v-btn fab x-small>
                        <span class="text-subtitle-2">
                          {{
                            form[option.product_options_groupe_id] &&
                            form[option.product_options_groupe_id][option.id]
                              ? form[option.product_options_groupe_id][
                                  option.id
                                ].quantity
                              : 0
                          }}
                        </span>
                      </v-btn>

                      <v-btn fab x-small @click="addOneOption(option)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </div>
                </template>
              </template>
            </v-form>
          </v-card-text>
        </v-card>
      </template>

      <v-card class="mb-auto">
        <v-card-title>¿Necesitas aclarar algo?</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="note"
            label="Notas al producto"
            counter
            rows="1"
          ></v-textarea>
        </v-card-text>
      </v-card>
    </v-container>

    <ProductActionButton
      :disabled="disabled"
      :loading="loading"
      @addToCart="addToCart"
    />
  </div>
</template>

<script>
export default {
  props: {
    commerce: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      note: null,
      quantity: 1,
      form: {},
      valid: true,
    }
  },

  computed: {
    disabled() {
      return !this.quantity
    },
    calcContainerHeight() {
      return this.commerce.has_footer
        ? 'height: calc(100vh - 40px)'
        : 'height: 100vh'
    },
  },

  methods: {
    addOneItem() {
      ++this.quantity
    },
    removeOneItem() {
      if (!this.quantity) return

      --this.quantity
    },

    async addToCart() {
      console.log('hola')

      await this.$store.dispatch('addToCart', {
        ...this.item,
        quantity: this.quantity,
        note: this.note,
        options: this.form,
      })

      this.$router.push({ name: 'commerce___es' })
    },

    onChangeCheckbox(item, option) {
      if (!this.form[option.product_options_groupe_id]) {
        this.form[option.product_options_groupe_id] = []
      }

      const i = this.form[option.product_options_groupe_id].findIndex(
        (e) => e.id === option.id
      )

      i >= 0
        ? this.form[option.product_options_groupe_id].splice(i, 1)
        : this.form[option.product_options_groupe_id].push(option)
    },

    addOneOption(option) {
      if (!this.form[option.product_options_groupe_id]) {
        this.$set(this.form, option.product_options_groupe_id, {})
      }

      !this.form[option.product_options_groupe_id][option.id]
        ? this.$set(this.form, option.product_options_groupe_id, {
            ...this.form[option.product_options_groupe_id],
            [option.id]: {
              ...option,
              quantity: 1,
            },
          })
        : this.form[option.product_options_groupe_id][option.id].quantity++
    },
    removeOneOption(option) {
      if (this.form[option.product_options_groupe_id][option.id].quantity > 1) {
        this.form[option.product_options_groupe_id][option.id].quantity--
        return
      }

      delete this.form[option.product_options_groupe_id][option.id]

      this.$set(this.form, option.product_options_groupe_id, {
        ...this.form[option.product_options_groupe_id],
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.description-container {
  max-height: 35vh;
  overflow-y: auto;
}
</style>
