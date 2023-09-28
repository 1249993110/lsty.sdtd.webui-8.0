import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => {
        return {
            isCollapse: false
        }
    },
    actions: {
        handleCollapse() {
            this.isCollapse = !this.isCollapse;
        }
    }
})