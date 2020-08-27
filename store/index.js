export const state = () => ({
  rubros: null,
  title: 'Vuetify.js',
})

export const getters = {}

export const mutations = {
  SET_RUBROS(state, payload) {
    state.rubros = payload
  },
  SET_TITLE(state, payload) {
    state.title = payload
  },
}

export const actions = {
  saveRubros({ commit }, payload) {
    commit('SET_RUBROS', payload)
  },
  saveTitle({ commit }, payload) {
    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    commit('SET_TITLE', capitalize(payload))
  }
}