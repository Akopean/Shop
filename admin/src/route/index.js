import Router from 'vue-router';
import Vue from 'vue';
import NProgress from 'nprogress';
import routes from './path';
import axios from 'axios';
import 'nprogress/nprogress.css';

Vue.use(Router);

NProgress.configure({showSpinner: false});// NProgress Configuration

axios.defaults.baseURL = process.env.VUE_APP_API_URL + process.env.VUE_APP_API_VERSION;

axios.interceptors.request.use(config => {
    NProgress.start();
    return config
});
// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
    NProgress.done();
    return response
}, error => {
    NProgress.done();
    if (error.response && error.response.data) {
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response.data.message) {
            toastr.error(error.response.data.message, 'Error')
        }
    }
    return Promise.reject(error)
});

const router = new Router({
    routes,
    mode: 'history',
    base: '/',
    linkActiveClass: 'active',
    // Prevents window from scrolling back to top
    // when navigating between components/views
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
});

router.afterEach((/*to, from*/) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
});

export default router;
