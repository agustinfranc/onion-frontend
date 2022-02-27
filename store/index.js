export const state = () => ({
  cart: [],
  commerce: {},
  order: {
    address: {},
    branch: {},
  },
  search: '',
  title: 'Onion',
})

export const getters = {
  rubrosFiltered: (state) => {
    if (!state.search || !state.commerce.rubros)
      return state.commerce.rubros ?? {}

    const search = state.search.toLowerCase()

    return state.commerce.rubros
      .map((rubro) => ({
        // filtro articulos
        ...rubro,
        subrubros: rubro.subrubros.map((subrubro) => ({
          ...subrubro,
          products: subrubro.products.filter((product) =>
            product.name.toLowerCase().includes(search)
          ),
        })),
      }))
      .map((rubro) => ({
        // filtro subrubros
        ...rubro,
        subrubros: rubro.subrubros.filter(
          (subrubro) => subrubro.products.length > 0
        ),
      }))
      .filter((rubro) => rubro.subrubros.length > 0) // filtro rubros
  },
}

export const mutations = {
  SAVE_ADDRESS(state, payload) {
    state.order.address = payload
  },
  SAVE_COMMERCE_BRANCH(state, payload) {
    state.order.branch = payload
  },
  SET_DATA(state, payload) {
    state.commerce = payload
  },
  SET_TITLE(state, payload) {
    state.title = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  },
  ADD_PRODUCT(state, payload) {
    state.cart.push(payload)
  },
  REMOVE_PRODUCT(state, payload) {
    state.cart.splice(payload.index, 1)
  },
  UPDATE_CART(state, payload) {
    for (const [key, value] of Object.entries(payload.item)) {
      state.cart[payload.index][key] = value
    }
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
  addToCart({ commit }, payload) {
    commit('ADD_PRODUCT', payload)
  },
  removeFromCart({ commit }, payload) {
    commit('REMOVE_PRODUCT', payload)
  },
  updateCart({ commit }, payload) {
    commit('UPDATE_CART', payload)
  },
  saveAddress({ commit }, payload) {
    commit('SAVE_ADDRESS', payload)
  },
  saveCommerceBranch({ commit }, payload) {
    commit('SAVE_COMMERCE_BRANCH', payload)
  },
}
