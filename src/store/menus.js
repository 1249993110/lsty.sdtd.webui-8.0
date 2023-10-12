import { defineStore } from 'pinia';

// menu = {
//     path: ,
//     label: ,
//     icon: ,
//     children: ,
//     isExternalLink: ,
// }

const tree = [
    {
        path: '/home',
        label: '主页',
        icon: 'home',
    },
    {
        path: '/controls',
        label: '控制面板',
        icon: 'control',
        children: [
            {
                path: 'online-players',
                label: '在线玩家',
                icon: 'user',
            },
            {
                path: 'history-players',
                label: '历史玩家',
                icon: 'user-solid',
            },
            {
                path: 'live-chat',
                label: '实时聊天',
                icon: 'chat-dot-square',
            },
            {
                path: 'chat-record',
                label: '聊天记录',
                icon: 'chat-line-square',
            },
            {
                path: 'item-blocks',
                label: '物品方块',
                icon: 'list',
            },
            {
                path: 'console',
                label: '控制台',
                icon: 'console',
            },
        ],
    },
    {
        path: '/functions',
        label: '功能面板',
        icon: 'menu',
        children: [
            {
                path: 'global-settings',
                label: '全局配置',
                icon: 'settings',
            },
            {
                path: 'game-notice',
                label: '游戏公告',
                icon: 'notice',
                children: [
                    {
                        path: 'settings',
                        label: '配置',
                        icon: 'settings',
                    },
                ],
            },
            {
                path: 'points-system',
                label: '积分系统',
                icon: 'coin',
                children: [
                    {
                        path: 'settings',
                        label: '配置',
                        icon: 'settings',
                    },
                    {
                        path: 'management',
                        label: '管理',
                        icon: 's-management',
                    },
                ],
            },
            {
                path: 'game-store',
                label: '游戏商店',
                icon: 'goods',
                children: [
                    {
                        path: 'settings',
                        label: '配置',
                        icon: 'settings',
                    },
                    {
                        path: 'management',
                        label: '管理',
                        icon: 's-management',
                    },
                ],
            },
            {
                path: 'tele-system',
                label: '传送系统',
                icon: 'position',
                children: [
                    {
                        path: 'friend/settings',
                        label: '好友传送',
                        icon: 'friend',
                    },
                    {
                        path: 'city',
                        label: '城市传送',
                        icon: 'city',
                        children: [
                            {
                                path: 'settings',
                                label: '配置',
                                icon: 'settings',
                            },
                            {
                                path: 'management',
                                label: '管理',
                                icon: 's-management',
                            },
                        ],
                    },
                    {
                        path: 'home',
                        label: '私人传送',
                        icon: 'home',
                        children: [
                            {
                                path: 'settings',
                                label: '配置',
                                icon: 'settings',
                            },
                            {
                                path: 'management',
                                label: '管理',
                                icon: 's-management',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: import.meta.env.VITE_APP_SWAGGER_URL,
        label: '接口文档',
        icon: 'document',
        isExternalLink: true,
    },
];

const dict = {};

const foreachTree = (menus, parentPath) => {
    for (let i = 0, len = menus.length; i < len; i++) {
        const menu = menus[i];
        if (parentPath && menu.path && menu.path[0] !== '/') {
            menu.path = parentPath + '/' + menu.path;
        }

        dict[menu.path] = menu;

        if (menu.children && menu.children.length) {
            foreachTree(menu.children, menu.path);
        }
    }
};

foreachTree(tree);

export const useMenusStore = defineStore('menus', {
    state: () => {
        return {
            tree: tree,
            dict: dict,
        };
    },
    actions: {
        getMenuByPath(path) {
            return this.dict[path];
        },
    },
});
