import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layout/index.vue';
import nProgress from '../plugins/nprogress';
import { useUserInfoStore } from '../store/user-info';
import qs from 'qs';

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('../views/Home.vue'),
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: '/controls',
        component: Layout,
        children: [
            {
                path: 'online-players',
                name: 'Controls.OnlinePlayers',
                component: () => import('../views/Controls/OnlinePlayers.vue'),
                meta: { requiresAuth: true },
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    parseQuery: qs.parse,
    stringifyQuery: qs.stringify,
});

router.beforeEach(async (to, from) => {
    nProgress.start();

    // 检查此路由需要授权, 用户是否已登录
    if (to.meta.requiresAuth) {
        const userInfoStore = useUserInfoStore();
        if (!userInfoStore.isLoggedIn) {
            // 如果没有, 则重定向到登录页面
            router.push({ path: '/login', query: { redirectPath: to.fullPath } })
            return false;
        }
    }
});

router.afterEach(() => {
    nProgress.done();
});

export default router;
