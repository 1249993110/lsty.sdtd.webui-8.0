<template>
    <template v-for="menu in items" :key="menu.path">
        <el-sub-menu class="sub-menu" v-if="menu.children && menu.children.length" :index="menu.path" popper-class="popper-menu-tree">
            <template #title>
                <Icon class="icon" :name="menu.icon"></Icon>
                <span>{{ menu.label }}</span>
            </template>
            <MenuTree :items="menu.children"></MenuTree>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path">
            <Icon class="icon" :name="menu.icon"></Icon>
            <template #title>
                <span>{{ menu.label }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup>
defineProps({
    items: Array,
});
</script>

<style scoped lang="scss">
.icon {
    margin-right: 10px;
}
.sub-menu {
    --el-menu-icon-width: 0;
}
</style>

<style lang="scss">
.popper-menu-tree {
    --el-menu-bg-color: #0c2135;
    --el-menu-text-color: #ffffffb3;
    --el-menu-hover-bg-color: darkslategray;
    --el-menu-active-color: #fff;
}
</style>
