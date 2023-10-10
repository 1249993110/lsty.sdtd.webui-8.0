<template>
    <el-container class="layout">
        <el-header class="header" height="48px">
            <Header />
        </el-header>
        <el-container class="under-header">
            <el-aside class="aside" :width="sidebarWidth">
                <Sidebar />
            </el-aside>
            <el-main>
                <Main />
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
import Main from './Main.vue';
import { useSidebarStore } from '../store/sidebar';
import { useTabsStore } from '../store/tabs';

const tabsStore = useTabsStore();
const sidebarStore = useSidebarStore();
const sidebarWidth = computed(() => (sidebarStore.isCollapse ? '64px' : '200px'));
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
        background-color: #f0f2f5;
        :deep(.el-tabs) {
            .el-tabs__header {
                margin: 0;
                background-color: #fff;
            }
        }
    }
    .el-footer {
        background-color: #f0f2f5;
    }

    .under-header {
        height: calc(100% - 48px);

        .aside {
            transition: 0.5s;
            overflow-x: hidden;
        }

        .router-view {
            height: calc(100% - 41px - 24px);
            overflow: auto;
            padding: 12px 16px;

            --search-box-height: 80px;
            --search-box-bottom: 12px;
            :deep(.search-box) {
                border-radius: 2px;
                height: var(--search-box-height);
                background-color: #fff;
                display: flex;
                flex-flow: row wrap;
                align-content: space-evenly;
                align-items: center;
                margin-bottom: var(--search-box-bottom);

                .keyword {
                    width: 300px;
                }
                .el-button {
                    width: 74px;
                }

                .el-input + .el-button {
                    margin-left: 24px;
                }

                .label {
                    font-size: 14px;
                    color: var(--el-text-color-regular);
                    margin-left: 24px;
                    margin-right: 6px;
                }
            }

            :deep(.table-box) {
                border-radius: 2px;
                background-color: #fff;
                height: calc(100% - var(--search-box-height) - var(--search-box-bottom));

                --operation-height: 50px;
                --footer-height: 50px;
                --el-table-height: calc(100% - var(--operation-height) - var(--footer-height));

                .operation {
                    padding-left: 16px;
                    height: var(--operation-height);
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    overflow: auto;

                    .el-button {
                        width: 74px;
                    }

                    .el-pagination {
                        box-sizing: border-box;
                    }

                    .el-radio-group {
                        margin-left: auto;
                        margin-right: 16px;
                        min-width: 168px;
                    }
                }

                .el-table {
                    height: var(--el-table-height);
                }
            }
        }
    }
}
</style>
