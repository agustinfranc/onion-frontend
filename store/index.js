export const state = () => ({
  commerce: {},
  title: 'Vuetify.js',
})

export const getters = {}

export const mutations = {
  SET_DATA(state, payload) {
    state.commerce = payload
  },
  SET_TITLE(state, payload) {
    state.title = payload
  },
}

export const actions = {
  saveData({ commit }, payload) {
    commit('SET_DATA', payload)
  },
  saveTitle({ commit }, payload) {
    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    commit('SET_TITLE', capitalize(payload))
  }
}