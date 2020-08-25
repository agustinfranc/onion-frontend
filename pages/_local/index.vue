<template>
  <div>
    <v-container :key="index">
      <h3>Recomendados</h3>

      <v-divider class="my-5"></v-divider>

      <div id="carousel">
        <flickity ref="flickity" :options="flickityOptions">
          <div class="carousel-cell" v-for="item in items" :key="item.id">
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>
            </v-card>
          </div>
        </flickity>
      </div>
    </v-container>

    <template v-for="(rubro, index) in rubros">
      <v-container :key="index" :id="rubro.nombre">
        <h3>{{rubro.nombre}}</h3>
      </v-container>

      <v-divider :key="index"></v-divider>

      <template v-for="(subrubro, index) in rubro.subrubros">
        <v-container :key="index">
          <p>{{subrubro.nombre}}</p>
        </v-container>

        <v-list three-line :key="index">
          <template v-for="(item, index) in subrubro.productos">
            <v-divider :key="index" v-if="index > 0"></v-divider>

            <v-list-item :key="item.nombre">
              <v-list-item-avatar>
                <v-img src="https://picsum.photos/128"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.nombre"></v-list-item-title>
                <v-list-item-subtitle v-html="item.descripcion"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </template>
    </template>
  </div>
</template>

<script>
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
    }
  },
  async asyncData({ $axios, store, params }) {
    if (store.state.rubros) return { rubros: store.state.rubros }

    console.log(
      `${location.protocol}//${location.hostname}:${location.port}/api/plaza/all`
    )
    console.log(`http://local.catalogo/api/${params.local}/all`)

    try {
      const res = await $axios.$get(
        `http://local.catalogo/api/${params.local}/all`
      )

      //await store.dispatch('saveRubros', res)

      console.log(res)

      /* const articulos = await $axios.$get(
        `${location.protocol}//${location.hostname}:${location.port}/json/articulos.json`
      )
      await store.dispatch('saveArticulos', articulos)
      console.log('Axios Articulos', articulos) */

      return {
        rubros: res,
      }
    } catch (error) {
      console.log('Error:', error)
    }
  },
}
</script>

<style>
.carousel-cell {
  width: 70%;
  margin-right: 10px;
}

.v-avatar.v-list-item__avatar {
  border-radius: 4px;
}
</style>