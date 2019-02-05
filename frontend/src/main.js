/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import VueAxios from 'vue-axios';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vee_en from 'vee-validate/dist/locale/en';
import vee_ru from 'vee-validate/dist/locale/ru';
import i18n from './lang';
import store from './store';
import router from './route';
import App from './App.vue';
import Settings from './settings';

import websanovaAuth from "@websanova/vue-auth";

import websanovaBearer from "@websanova/vue-auth/drivers/auth/bearer.js";

import websanovaAxios from "@websanova/vue-auth/drivers/http/axios.1.x.js";

import websanovaRouter from "@websanova/vue-auth/drivers/router/vue-router.2.x.js";

require('./bootstrap');


// https://baianat.github.io/vee-validate/
Vue.use(VeeValidate, {
    errorBagName: 'vErrors',
    // validity: true
    i18nRootKey: 'validations',
    i18n,
    dictionary: {
        en: vee_en,
        ru: vee_ru,
    },
});

Vue.use(Vuetify, {
    options: {
        customProperties: true,
    },
    theme: {
        primary: '#40C4FF',
        secondary: '#FFAB40',
        accent: '#42A5F5',
        error: '#E64A19',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#9CCC65',

        sidebar_header: '#22A7F0',
    },
    lang: {
        t: (key, ...params) => i18n.t(key, params),
        // current: 'en'
    },
});

Vue.use(VueAxios, window.axios);

// Enable Debug and Tools
// https://012.vuejs.org/api/global-api.html
Vue.config.debug = true;
Vue.config.devTools = true;
Vue.config.productionTip = false;


// https://router.vuejs.org/ru/guide/
Vue.router = router;

// https://github.com/websanova/vue-auth/blob/master/docs/Guide.md
Vue.use(websanovaAuth, {
    auth: websanovaBearer,
    http: websanovaAxios,
    router: websanovaRouter,
    rolesVar: 'role',
    refreshData:   {url: 'auth/refresh', enabled: false},
    loginData:    {fetchUser: true, url: 'auth/login', method: 'POST'},
    logoutData:   {url: 'auth/logout', method: 'POST', makeRequest: true},
    registerData: {url: 'auth/signup', method: 'POST', redirect: '/'},
    fetchData:    {url: 'auth/user', method: 'GET'},
    facebookOauth2Data: {
        clientId: '636436920147099',
        params: {
            url: "https://www.facebook.com/v3.2/dialog/oauth",
            redirect_uri: () => `${Settings.BASE_URL}login`,
            response_type: 'token',
        }
     },
});


const app = new Vue({
    el: '#app',
    store,
    router,
    i18n,
    render: h => h(App),
});
