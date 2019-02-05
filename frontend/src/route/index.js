import Router from 'vue-router';
import Vue from 'vue';
import NProgress from 'nprogress';
import axios from 'axios';
import Settings from '../settings';
import routes from './path';
// NProgress Configuration
import 'nprogress/nprogress.css';

Vue.use(Router);

NProgress.configure({showSpinner: false});// progress bar style

axios.defaults.baseURL = Settings.API_ROUTE_PATH;

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
    if (response.data.status && response.status === 200) {
        if (response.data.status && response.data.status === 'success') {
            window.toastr.success(response.data.status, 'Success')
        }
    }
    return response
}, error => {
    if (error.response.status === 401 || error.response.status === 403) {
        Vue.router.push('login');
      /*  Vue.auth.logout({
            redirect: 'login',
            makeRequest: false,
        });*/
    }
    else if (error.response.status === 500) {
        window.toastr.error(error.response.data.message, 'Error');
        Vue.router.push('error-500');
    }
    return Promise.reject(error)
});

const router = new Router({
    routes,
    mode: 'history',
    base: Settings.ROUTE_PATH,
    linkActiveClass: 'active',
    // Prevents window from scrolling back to top
    // when navigating between components/views
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {x: 0, y: 0};
    },
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start();
    }
    next();
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done();
});

export default router;
