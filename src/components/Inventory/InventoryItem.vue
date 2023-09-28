<template>
    <el-tooltip v-if="item != null" placement="bottom-start" :show-after="500">
        <div class="image-container">
            <el-image :src="getIconUrl(item)" class="image" lazy></el-image>
            <span v-if="item.quality === -1" class="inventory-item-count">{{ item.count }}</span>
            <span v-if="item.quality !== -1" :style="getQualityStyle(item)" class="inventory-item-quality"></span>
        </div>
        <template #content>
            名称 {{ item.itemName }}<br />
            数量 {{ item.count }}<br />
            质量 {{ item.quality }}<br />
            图标 {{ item.icon }}<br />
            图标颜色 {{ item.iconColor }}<br />
            最大使用时长 {{ item.maxUseTimes }}<br />
            使用时长 {{ item.useTimes }}<br />
        </template>
    </el-tooltip>
</template>

<script setup>
import { ElTooltip, ElImage } from 'element-plus';

defineProps({
    item: {
        type: Object,
    },
});

const getIconUrl = (item) => {
    let itemName = item.icon;
    if (item.iconColor !== 'FFFFFF') {
        itemName += '__' + item.iconColor;
    }

    return import.meta.env.VITE_APP_API_BASE_URL + 'ItemIcons/' + itemName + '.png';
};

const getQualityStyle = (item) => {
    const durability = (1 - item.useTimes / item.maxUseTimes) * 80;
    return { 'background-color': `#${item.qualityColor}C8`, width: (durability > 80 ? 80 : durability) + 'px' };
};
</script>

<style scoped lang="scss">
.image-container {
    margin: 1px;
    position: relative;
    height: 80px;
    width: 80px;

    .image {
        display: block;
        height: 100%;
        width: 100%;
        background-color: rgba(96, 96, 96, 0.5);
    }

    .inventory-item-count {
        color: orangered;
        font-size: 20px;
        position: absolute;
        right: 1px;
        bottom: 1px;
    }

    .inventory-item-quality {
        height: 16px;
        position: absolute;
        bottom: 0;
    }
}
</style>
