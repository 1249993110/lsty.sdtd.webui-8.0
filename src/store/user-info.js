import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('user-info', {
    state: () => {
        return {
            username: 'Admin',
            accessToken: localStorage.getItem('access-token'),
            isLoggedIn: !!localStorage.getItem('access-token'),
        };
    },
    getters: {},
    actions: {
        saveToken(accessToken) {
            localStorage.setItem('access-token', accessToken);
            this.isLoggedIn = true;
        },
        clear() {
            this.isLoggedIn = false;
            localStorage.clear();
        },
    },
});
