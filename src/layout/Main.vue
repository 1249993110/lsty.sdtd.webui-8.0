<template>
    <el-tabs closable v-model="activeName" type="card" @tab-remove="handleTabRemove">
        <el-tab-pane v-for="item in activeMenus" :key="item.path" :name="item.path">
            <template #label>
                <Icon class="icon" :name="item.icon" />
                <span>{{ item.label }}</span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { useTabsStore } from '../store/tabs';
import { useMenusStore } from '../store/menus';

const route = useRoute();
const router = useRouter();
const activeName = computed({
    get: () => route.path,
    set: (path) => router.push(path),
});

const tabsStore = useTabsStore();
const handleTabRemove = (path) => {
    tabsStore.remove(path);
};

const menusStore = useMenusStore();
const activeMenus = computed(() => {
    return tabsStore.paths.map((i) => menusStore.getMenuByPath(i));
});
</script>

<style scoped>
.icon {
    margin-right: 6px;
}
:deep(.el-tabs__nav .el-tabs__item:nth-child(1) i) {
    display: none;
}
</style>
