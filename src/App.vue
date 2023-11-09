<template>
    <router-view />
</template>

<script setup>
import * as signalr from './utils/signalr';
import { useUserInfoStore } from './store/user-info';
import { useGameLocalizationStore } from './store/game-localization';

const userInfoStore = useUserInfoStore();
const isLoggedIn = computed(() => userInfoStore.isLoggedIn);
watch(
    isLoggedIn,
    (val) => {
        if (val) {
            signalr.start();
            useGameLocalizationStore();
        } else {
            signalr.stop();
        }
    },
    {
        immediate: true,
    }
);
</script>
