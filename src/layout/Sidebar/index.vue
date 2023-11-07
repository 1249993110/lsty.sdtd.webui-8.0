<template>
    <div class="sidebar" ref="sidebarRef">
        <el-menu class="menu" :default-active="defaultMenu" @select="handleSelectMenu" :collapse="sidebarStore.isCollapse">
            <MenuTree :items="menusStore.tree" />
        </el-menu>
    </div>
</template>

<script setup>
import MenuTree from './MenuTree.vue';
import { useMenusStore } from '~/store/menus';
import { useTabsStore } from '~/store/tabs';
import { useSidebarStore } from '~/store/sidebar';
import { OverlayScrollbars } from 'overlayscrollbars';

const sidebarRef = ref();
const route = useRoute();
const menusStore = useMenusStore();
const tabsStore = useTabsStore();
const sidebarStore = useSidebarStore();

const defaultMenu = computed(() => route.path);
tabsStore.add(defaultMenu.value);

const handleSelectMenu = (path) => {
    const menu = menusStore.getMenuByPath(path);
    if (menu.isExternalLink) {
        window.open(menu.path);
    } else {
        tabsStore.add(path);
    }
};

onMounted(() => {
    OverlayScrollbars(sidebarRef.value, {
        overflow: {
            x: 'hidden',
            y: 'scroll',
        },
        scrollbars: {
            theme: 'os-theme-light',
        },
    });
});
</script>

<style scoped lang="scss">
.sidebar {
    height: 100%;
    .menu {
        min-height: 100%;
        // 滑动特效关键代码
        &:not(.el-menu--collapse) {
            width: 200px;
        }

        --el-menu-bg-color: #001529af;
        --el-menu-text-color: #ffffffb3;
        --el-menu-hover-bg-color: #2e4d4daf;
        --el-menu-active-color: #fff;

        :deep(.el-sub-menu),
        :deep(.el-menu-item) {
            &:hover {
                color: #fff;
            }

            .el-menu--inline {
                background-color: #0c2135af;
            }
        }

        :deep(.el-menu-item.is-active) {
            background-color: #0960bdaf;
        }

        &.el-menu--collapse {
            :deep(.el-sub-menu),
            :deep(.el-menu-item) {
                &.is-active {
                    background-color: #00061a;

                    .el-tooltip__trigger {
                        border-left: 4px solid #0960bd;
                        padding: 0 16px;
                    }
                }

                .el-tooltip__trigger {
                    padding: 0 16px 0 20px;
                }
            }
        }
    }
}
</style>
