export const state = () => ({
  commerce: {},
  search: '',
  title: 'Vuetify.js',
})

export const getters = {
  rubrosFiltered: (state) => {
    if (!state.search || !state.commerce.rubros)
      return state.commerce.rubros ?? {}

    const search = state.search.toLowerCase()

    return state.commerce.rubros
      .map((rubro) => ({                                  // filtro articulos
        ...rubro,
        subrubros: rubro.subrubros.map((subrubro) => ({
          ...subrubro,
          products: subrubro.products.filter(
            (product) => product.name.toLowerCase().indexOf(search) >= 0
          ),
        })),
      }))
      .map((rubro) => ({                                  // filtro subrubros
        ...rubro,
        subrubros: rubro.subrubros.filter(
          (subrubro) => subrubro.products.length > 0
        ),
      }))
      .filter((rubro) => rubro.subrubros.length > 0)      // filtro rubros
  },
}

export const mutations = {
  SET_DATA(state, payload) {
    state.commerce = payload
  },
  SET_TITLE(state, payload) {
    state.title = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  },
}

export const actions = {
  saveData({ commit }, payload) {
    commit('SET_DATA', payload)
  },
  saveTitle({ commit }, payload) {
    const capitalize = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1)

    commit('SET_TITLE', capitalize(payload))
  },
  setSearch({ commit }, payload) {
    commit('SET_SEARCH', payload)
  },
}
