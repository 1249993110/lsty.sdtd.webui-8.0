import { defineStore } from 'pinia';
import { getLocalization } from '~/api/server-management';

export const useGameLocalizationStore = defineStore('game-localization', {
    state: () => {
        return {
            dict: {},
        };
    },
    getters: {},
    actions: {
        async init() {
            this.dict = await getLocalization();
        },
    },
});
