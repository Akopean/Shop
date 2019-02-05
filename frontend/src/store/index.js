import Vuex from 'vuex';
import Vue from 'vue';
import createPersist from 'vuex-localstorage';
import modules from './modules';

// https://vuex.vuejs.org/ru/installation.html
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const localStorage = createPersist({
  namespace: 'Shop',
  initialState: {},
  expires: 1.21e+9, // Two Weeks
});

const store = new Vuex.Store({
    modules,
    strict: debug,
    plugins: [localStorage]
});

export default store
