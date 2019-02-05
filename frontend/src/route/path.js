import Index from '../views/Index';
import Login from '../views/Auth/Login.vue';
import Layout from '../components/layout/Layout.vue';
import ResetPassword from '../views/Auth/ResetPassword.vue';
import ForgotPassword from '../views/Auth/ForgotPassword.vue';
import Error_404 from '../views/Error/404.vue';
import Register from '../views/Auth/Register';
import VerifyEmail from '../views/Auth/VerifyEmail';

export default [
    {
        path: '',
        component: Layout,
        redirect: '/',
        meta: {
            //auth: true,
            noCache: true,
        },
        children: [
            {
                path: '/',
                component: Index,
                name: 'index',
            },
        ],
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            auth: false,
        },
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            auth: false,
        },
    },
    {
        path: '/forgot_password',
        component: ForgotPassword,
        name: 'ForgotPassword',
        meta: {
            auth: false,
        },
    },
    {
        path: '/verify-email',
        component: VerifyEmail,
        name: 'verify-email',
        meta: {
            //auth: false,
        },
    },
    {
        path: '/reset_password/:token',
        component: ResetPassword,
        name: 'ResetPassword',
        props: true,
        meta: {
            auth: false,
        },
    },
    {
        path: '/404',
        component: Error_404,
        name: '404',
    },
    {
        path: '*',
        redirect: {
            path: '/404',
        },
    },
];
