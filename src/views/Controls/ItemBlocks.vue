<template>
    <el-card class="item-blocks">
        <div class="search-container">
            <el-checkbox v-model="itemsChecked" label="物品" size="large" />
            <el-checkbox v-model="blocksChecked" label="方块" size="large" />
            <el-checkbox v-model="devItemsChecked" label="开发方块" size="large" />
            <el-input class="input" v-model="queryParams.keyword" placeholder clearable @keyup.enter.native="search"></el-input>
            <el-button class="button" type="primary" @click="search" size="large">
                <template #icon><Icon name="search" /></template>
                搜 索
            </el-button>
        </div>
        <div class="items-container" v-infinite-scroll="load">
            <el-tooltip placement="right-end" :show-after="500" v-for="item in items" :key="item.id">
                <el-image class="image" :src="item.url" lazy />
                <template #content>
                    {{ item.isBlock ? '方块' : '物品' }} Id {{ item.id }}<br />
                    名称 {{ item.itemName }}<br />
                    本地化名称 {{ item.localizationName }}<br />
                    图标 {{ item.itemIcon }}<br />
                    图标颜色 {{ item.iconColor }}<br />
                    最大堆叠数量 {{ item.maxStackAllowed }}<br />
                </template>
            </el-tooltip>
            <el-empty :image-size="200" v-if="items.length === 0" style="width: 100%" />
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'Controls.ItemBlocks',
};
</script>

<script setup>
import { getItemBlocks } from '~/api/server-management';

const items = reactive([]);
const itemsChecked = ref(true);
const blocksChecked = ref(true);
const devItemsChecked = ref(false);

const getIconUrl = (item) => {
    let itemName = item.itemIcon;
    if (item.iconColor !== 'FFFFFF') {
        itemName += '__' + item.iconColor;
    }

    return import.meta.env.VITE_APP_API_BASE_URL + 'ItemIcons/' + itemName + '.png';
};

const queryParams = reactive({
    pageNumber: 0,
    pageSize: 50,
    keyword: '',
    itemBlockKind: 0,
    showUserHidden: false,
});

const getData = async () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });

    try {
        if (itemsChecked.value && blocksChecked.value) {
            queryParams.itemBlockKind = 0;
        } else if (itemsChecked.value && !blocksChecked.value) {
            queryParams.itemBlockKind = 1;
        } else if (!itemsChecked.value && blocksChecked.value) {
            queryParams.itemBlockKind = 2;
        } else {
            ElMessage.info('您必须至少选中一个种类');
            return;
        }

        queryParams.showUserHidden = devItemsChecked.value;

        const data = (await getItemBlocks(queryParams)).items;
        const len = data.length;
        if (len === 0) {
            ElMessage.success('没有更多数据了');
            return;
        }

        for (let i = 0; i < len; i++) {
            const item = data[i];
            const url = getIconUrl(item);
            items.push({
                url: url,
                ...item,
            });
        }
    } finally {
        loading.close();
    }
};

const search = () => {
    items.length = 0;
    queryParams.pageNumber = 1;
    getData();
};

watch([itemsChecked, blocksChecked, devItemsChecked], search);

const load = () => {
    queryParams.pageNumber += 1;
    getData();
};
</script>

<style scoped lang="scss">
.item-blocks {
    height: 100%;

    :deep(.el-card__body) {
        height: 100%;
    }

    .search-container {
        margin-left: auto;
        display: flex;
        .input {
            margin-left: 8px;
            width: 400px;
        }
        .button {
            margin-left: 8px;
        }
    }

    .items-container {
        overflow: auto;
        height: calc(100% - 48px);
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        .image {
            margin: 1px;
            display: block;
            height: 160px;
            width: 160px;
            background-color: rgba(96, 96, 96, 0.5);
        }
    }
}
</style>
