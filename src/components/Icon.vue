<template>
    <svg class="icon" aria-hidden="true" :style="{ fontSize: `${size}px`, color: `${color}` }">
        <use :xlink:href="'#icon-' + name"></use>
    </svg>
</template>

<script setup>
defineProps({
    name: String, // 需要添加的字体图标名称，不需要以 #icon- 开始
    color: {
        // 图标颜色
        type: String
    },
    size: {
        // 图标大小
        type: [String, Number],
        default: 16,
    },
});
</script>

<style scoped lang="scss">
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

    &.icon-button {
        cursor: pointer;
        &:focus {
            outline: none;
        }
    }
}
</style>
