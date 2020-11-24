// https://www.npmjs.com/package/vuex-persistedstate

import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      // * key: 'data',  // name of the key (default: vuex)
      //paths: ["rubros"],   // states to persist
      paths: [],
    })(store)
  })
}
