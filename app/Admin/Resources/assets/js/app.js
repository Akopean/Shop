/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import App from './App.vue'
import router from './route'
import store from './store'
import i18n from './lang'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import Vuetify from 'vuetify'
import moment from 'vue-moment'
import websanovaVueRouter from "@websanova/vue-auth/drivers/router/vue-router.2.x.js";
import websanovaAxios from "@websanova/vue-auth/drivers/http/axios.1.x.js";
import websanovaBearer from "@websanova/vue-auth/drivers/auth/bearer.js";
import websanovaVueAuth from "@websanova/vue-auth";
import 'vuetify/dist/vuetify.min.css'
import vee_en from 'vee-validate/dist/locale/en'
import vee_ru from 'vee-validate/dist/locale/ru'
import vee_currency from './vuevalidate/validators/currency'

/*
 import { library } from '@fortawesome/fontawesome-svg-core';
 import { faBars, faComments, faSearch, faBell, faThLarge, faFile,
 faEnvelope, faUsers, faCircleNotch, faLanguage, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 library.add(faComments, faBars, faSearch, faBell, faThLarge, faFile, faEnvelope, faUsers
 , faCircleNotch, faLanguage, faSignOutAlt);

 Vue.component('font-awesome-icon', FontAwesomeIcon);
 */


//https://baianat.github.io/vee-validate/
Vue.use(VeeValidate, {
    errorBagName: 'vErrors',
    //validity: true
    i18nRootKey: 'validations',
    i18n,
    dictionary: {
        en: vee_en,
        ru: vee_ru
    }
});

Validator.extend('currency', {
    validate: vee_currency
});

Vue.use(Vuetify, {
    options: {
        customProperties: true
    },
    theme: {
        primary: '#40C4FF',
        secondary: '#FFAB40',
        accent: '#42A5F5',
        error: '#E64A19',
        warning: '#ffae28',
        info: '#2196f3',
        success: '#0ab218',

        sidebar_header: '#22A7F0',
    },
    lang: {
        t: (key, ...params) => i18n.t(key, params),
        //current: 'en'
    }
});

Vue.use(VueAxios, window.axios);
Vue.use(moment);
//Enable Debug and Tools
// https://012.vuejs.org/api/global-api.html
Vue.config.debug = true;
Vue.config.devTools = true;
Vue.config.productionTip = false;


// https://router.vuejs.org/ru/guide/
Vue.router = router;

// https://github.com/websanova/vue-auth/blob/master/docs/Guide.md
Vue.use(websanovaVueAuth, {
    auth: websanovaBearer,
    http: websanovaAxios,
    router: websanovaVueRouter,
    rolesVar: 'role',
    refreshData: {url: '../auth/refresh', enabled: false},
    loginData: {fetchUser: true, url: '../auth/login', method: 'POST'},
    logoutData:{url: '../auth/logout', method: 'POST', makeRequest: true},
    fetchData: {url: '../auth/user', method: 'GET'},
   /* registerData:       {url: 'auth/register',     method: 'POST', redirect: '/login'},
    loginData:          {url: 'auth/login',        method: 'POST', redirect: '/'},
    logoutData:         {url: 'auth/logout',       method: 'POST', redirect: '/', makeRequest: false},
    oauth1Data:         {url: 'auth/login',        method: 'POST'},
    fetchData:          {url: 'auth/user',         method: 'GET'},
    refreshData:        {url: 'auth/refresh',      method: 'GET'},
    loginOtherData:     {url: 'auth/login-other',  method: 'POST', redirect: '/'},
    logoutOtherData:    {url: 'auth/logout-other', method: 'POST', redirect: '/admin', makeRequest: false},*/
    /*facebookOauth2Data: {
     clientId: '196729390739201'
     },
     googleOauth2Data: {
     clientId: '547886745924-4vrbhl09fr3t771drtupacct6f788566.apps.googleusercontent.com'
     }*/
});


new Vue({
    el: '#app',
    store,
    router,
    i18n,
    render: h => h(App),
});
