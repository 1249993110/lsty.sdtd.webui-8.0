<template>
    <el-container class="layout">
        <el-header height="48px">
            <Header />
        </el-header>
        <el-container class="under-header">
            <el-aside class="aside" :width="sidebarWidth">
                <Sidebar />
            </el-aside>
            <el-main>
                <el-tabs class="main" closable v-model="activeName" type="card" @tab-remove="handleTabRemove">
                    <el-tab-pane v-for="item in activeMenus" :key="item.path" :name="item.path">
                        <template #label>
                            <Icon class="icon" :name="item.icon" />
                            <span>{{ item.label }}</span>
                        </template>
                    </el-tab-pane>
                </el-tabs>
                <div class="router-view" v-if="tabsStore.isRouterAlive">
                    <router-view v-slot="{ Component }">
                        <transition mode="out-in">
                            <keep-alive :include="tabsStore.routeNames">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Sidebar from './Sidebar/index.vue';
import Header from './Header.vue';
import { useSidebarStore } from '../store/sidebar';
import { useTabsStore } from '../store/tabs';
import { useMenusStore } from '../store/menus';

const tabsStore = useTabsStore();
const sidebarStore = useSidebarStore();
const sidebarWidth = computed(() => (sidebarStore.isCollapse ? '64px' : '200px'));

const route = useRoute();
const router = useRouter();
const activeName = computed({
    get: () => route.path,
    set: (path) => router.push(path),
});

const handleTabRemove = (path) => {
    tabsStore.remove(path);
};

const menusStore = useMenusStore();
const activeMenus = computed(() => {
    return tabsStore.paths.map((i) => menusStore.getMenuByPath(i));
});
</script>

<style scoped lang="scss">
.layout {
    height: 100%;
    .el-container {
        height: 100%;
    }
    .el-header {
        padding: 0;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    }
    .el-main {
        padding: 4px;
        background-color: #f0f2f5af;

        .icon {
            margin-right: 6px;
        }
        :deep(.el-tabs__nav .el-tabs__item:nth-child(1) i) {
            visibility: hidden;
        }

        :deep(.el-tabs) {
            .el-tabs__header {
                --el-tabs-header-height: 35px;
                margin: 0;
                background-color: #ffffffaf;
            }

            .el-tabs__item.is-active {
                border-bottom: 2px solid mediumblue;
            }
        }
    }
    .el-footer {
        background-color: #f0f2f5af;
    }

    .under-header {
        height: calc(100% - 48px);

        .aside {
            transition: 0.5s;
            overflow-x: hidden;
        }

        .router-view {
            height: calc(100% - 80px);
            overflow: auto;
            padding: 20px;

            & > div {
                height: 100%;
            }
        }
    }
}
</style>
