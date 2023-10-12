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
            {
                path: 'history-players',
                name: 'Controls.HistoryPlayers',
                component: () => import('../views/Controls/HistoryPlayers.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: 'live-chat',
                name: 'Controls.LiveChat',
                component: () => import('../views/Controls/LiveChat.vue'),
            },
            {
                path: 'chat-record',
                name: 'Controls.ChatRecord',
                component: () => import('../views/Controls/ChatRecord.vue'),
            },
            {
                path: 'item-blocks',
                name: 'Controls.ItemBlocks',
                component: () => import('../views/Controls/ItemBlocks.vue'),
            },
            {
                path: 'console',
                name: 'Controls.Console',
                component: () => import('../views/Controls/Console.vue'),
            },
        ],
    },
    {
        path: '/functions',
        component: Layout,
        children: [
            {
                path: 'global-settings',
                name: 'Functions.GlobalSettings',
                component: () => import('../views/Functions/GlobalSettings.vue'),
            },
        ],
    },
    {
        path: '/functions/game-notice',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'Functions.GameNotice.Settings',
                component: () => import('../views/Functions/GameNotice/Settings.vue'),
            },
        ],
    },
    {
        path: '/functions/points-system',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'Functions.PointsSystem.Settings',
                component: () => import('../views/Functions/PointsSystem/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.PointsSystem.Management',
                component: () => import('../views/Functions/PointsSystem/Management/index.vue'),
            },
        ],
    },
    {
        path: '/functions/game-store',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'Functions.GameStore.Settings',
                component: () => import('../views/Functions/GameStore/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.GameStore.Management',
                component: () => import('../views/Functions/GameStore/Management/index.vue'),
            },
        ],
    },
    {
        path: '/functions/tele-system/friend',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'Functions.TeleSystem.Friend.Settings',
                component: () => import('../views/Functions/TeleSystem/TeleportFriend/Settings.vue'),
            },
        ],
    },
    {
        path: '/functions/tele-system/city',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'Functions.TeleSystem.TeleportCity.Settings',
                component: () => import('../views/Functions/TeleSystem/TeleportCity/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.TeleSystem.TeleportCity.Management',
                component: () => import('../views/Functions/TeleSystem/TeleportCity/Management/index.vue'),
            },
        ],
    },
    {
        path: '/functions/tele-system/home',
        component: Layout,
        children: [
            {
                path: 'settings',
                name: 'Functions.TeleSystem.TeleportHome.Settings',
                component: () => import('../views/Functions/TeleSystem/TeleportHome/Settings.vue'),
            },
            {
                path: 'management',
                name: 'Functions.TeleSystem.TeleportHome.Management',
                component: () => import('../views/Functions/TeleSystem/TeleportHome/Management/index.vue'),
            },
        ],
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
            router.push({ path: '/login', query: { redirectPath: to.fullPath } });
            return false;
        }
    }
});

router.afterEach(() => {
    nProgress.done();
});

export default router;
