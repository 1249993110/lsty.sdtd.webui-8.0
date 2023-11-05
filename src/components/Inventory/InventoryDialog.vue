<template>
    <el-dialog :title="title" v-model="visible" width="897px" draggable @closed="onClosed">
        <div style="width: 859px">
            <div class="bag">
                <div>背包</div>
                <div class="split">
                    <InventoryItem v-for="(item, index) in inventory.bag" :key="index" :item="item"></InventoryItem>
                </div>
            </div>
            <div class="equipment">
                <div>装备</div>
                <div class="split">
                    <InventoryItem v-for="(item, index) in inventory.equipment" :key="index" :item="item"></InventoryItem>
                </div>
            </div>
        </div>
        <div style="width: 820px">
            <div>腰带</div>
            <div class="belt">
                <InventoryItem v-for="(item, index) in inventory.belt" :key="index" :item="item"></InventoryItem>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import InventoryItem from './InventoryItem.vue';

const props = defineProps({
    title: {
        type: String,
    },
    visible: {
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Object,
    },
});

const emit = defineEmits(['onClosed']);
const visible = ref(props.visible);

const onClosed = () => {
    emit('onClosed');
};
</script>

<style scoped lang="scss">
.bag {
    display: inline-block;
    width: 673px;
    vertical-align: top;
}
.equipment {
    display: inline-block;
    width: 181px;
    vertical-align: top;
}

.split {
    display: flex;
    flex-wrap: wrap;
    height: 410px;
    overflow: auto;
}
.belt {
    display: flex;
    flex-wrap: wrap;
}
</style>
