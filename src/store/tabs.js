import { defineStore } from 'pinia';
import { nextTick } from 'vue';
import router from '../router';

export const useTabsStore = defineStore('tabs', {
    state: () => {
        return {
            paths: [],
            isRouterAlive: true,
        };
    },
    getters: {
        includes() {
            return this.paths.map((i) => {
                return router.resolve({
                    path: i,
                }).name;
            });
        },
    },
    actions: {
        add(path) {
            if (!this.paths.some((item) => item === path)) {
                this.paths.push(path);
            }
            
            router.push(path);
        },
        remove(path) {
            let paths = this.paths;
            let current = router.currentRoute.value.path;
            // 如果当前活动的是将要移除的
            if (current === path) {
                let newPath;
                paths.forEach((item, index) => {
                    if (item === path) {
                        newPath = paths[index + 1] ?? paths[index - 1];
                    }
                });

                router.push(newPath);
            }

            this.paths = paths.filter((item) => item !== path);
        },
        refresh() {
            this.isRouterAlive = false;
            nextTick(() => {
                this.isRouterAlive = true;
            });
        },
    },
});
