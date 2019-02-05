import Vuex from 'vuex'
import Vue from 'vue'
import createPersist from 'vuex-localstorage'
import modules from './modules'


// https://vuex.vuejs.org/ru/installation.html
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

let localStorage = createPersist({
    namespace: 'Admin',
    initialState: {},
    expires: 1.21e+9 // Two Weeks
});

const store = new Vuex.Store({
    modules,
    strict: debug,
    plugins: [localStorage]
});
/*
// Автоматически запустить действие `init` для каждого существующего модуля
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}*/

export default store
