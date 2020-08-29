<template>
  <div>
    <v-container v-if="rubros" :key="index">
      <h3>{{rubros[0].nombre}}</h3>

      <v-divider class="my-5"></v-divider>

      <div id="carousel">
        <flickity ref="flickity" :options="flickityOptions">
          <div
            class="carousel-cell"
            v-for="item in rubros[0].subrubros[0].productos"
            :key="item.id"
          >
            <v-card class="mx-auto" min-height="370" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="`/img/${params.local}/${item.avatar}`"
              ></v-img>

              <v-card-title class="text-truncate">{{ item.nombre }}</v-card-title>

              <v-card-subtitle class="pb-0 text-truncate__multiple-lines text-truncate__three-lines">{{ item.descripcion }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <p class="mt-1">${{ item.precio }}</p>
              </v-card-text>
            </v-card>
          </div>
        </flickity>
      </div>
    </v-container>

    <template v-for="(rubro, index) in rubros">
      <template v-if="index > 0">
        <div :key="rubro.nombre" :id="rubro.nombre" class="div-fix-for-tabs">
          <v-container :key="rubro.nombre">
            <h3>{{rubro.nombre}}</h3>
          </v-container>

          <v-divider :key="index"></v-divider>

          <template v-for="(subrubro, index) in rubro.subrubros">
            <v-container v-if="index > 0" :key="subrubro.nombre">
              <span>{{subrubro.nombre}}</span>
            </v-container>

            <v-list three-line :key="index">
              <template v-for="(item, index) in subrubro.productos">
                <v-divider :key="item.nombre" v-if="index > 0"></v-divider>

                <v-list-item :key="item.nombre">
                  <v-list-item-avatar>
                    <v-img :src="`/img/${params.local}/${item.avatar}`"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.nombre"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.descripcion"></v-list-item-subtitle>
                    <p class="mt-1 text-body-2">${{ item.precio }}</p>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      rubros: null,
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        cellAlign: 'left',
        contain: true,
        autoPlay: true,
        // any options from Flickity can be used
      },
      items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      params: null,
    }
  },
  async asyncData({ $axios, store, params }) {
    if (store.state.rubros) return { rubros: store.state.rubros }

    await store.dispatch('saveTitle', params.local)

    try {
      const url =
        location.port != 3001
          ? `${location.protocol}//backend.${location.hostname}/api/${params.local}/all`
          : `${location.protocol}//local.catalogo/api/${params.local}/all`

      const res = await $axios.$get(url)

      await store.dispatch('saveRubros', res)

      console.log(res)

      /* const articulos = await $axios.$get(
        `${location.protocol}//${location.hostname}:${location.port}/json/articulos.json`
      )
      await store.dispatch('saveArticulos', articulos)
      console.log('Axios Articulos', articulos) */

      return {
        rubros: res,
        params: params,
      }
    } catch (error) {
      console.log('Error:', error)
    }
  },
}
</script>