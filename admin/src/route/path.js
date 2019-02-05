import Layout from '.././components/layout/Layout.vue';
import Dashboard from '../views/Dashboard/index.vue';
import Log from '../views/Log.vue';
import Login from '../views/Auth/Login.vue';

import customerRoutes from './customer-routes'
import productRoutes from './product-routes'


import Error_404 from '../views/Error/404.vue';
import Error_403 from '../views/Error/403.vue';

export default [
    // Dashboard PAGE
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        meta: {
            auth: {roles: ['admin'], redirect: {name: 'login'}, forbiddenRedirect: '/404'},
            noCache: true,
            breadcrumbs: {
                bcDynamic: false,
                //bcGetter: 'activeUser', // <breadcrumb> will use this getter to get the user from vuex
                bcLinkText: 'Dashboard', //user =>  user.name, // once we have the user, we use this function to format the LinkText dnynamically,
                //bcLoadingText: 'Loading Username...' // This will be shown while Data is loading
            }
        },
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                name: 'Dashboard',
                meta: {
                    tagView: true,
                },
            },
            {
                path: '/log',
                component: Log,
                name: 'Log',
            },
            ...customerRoutes,
            ...productRoutes,
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            auth: false
        },
    },
    {
        path: '/404',
        component: Error_404,
        name: '404',
    },
    {
        path: '/403',
        component: Error_403,
        name: '403',
    },
    {
        path: '*',
        redirect: {
            path: '/404'
        }
    },
];

