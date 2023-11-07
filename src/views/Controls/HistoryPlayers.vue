<template>
    <MyTableEx
        @on-export="handleExport"
        @on-contextmenu="handleContextmenu"
        :search-form-model="searchFormModel"
        :get-data="getData"
        :table-data="tableData"
        :total="total"
        :show-add-btn="false"
        :show-edit-btn="false"
        :operation-column-width="90"
        :delete="deleteRequest"
        :batch-delete="batchDeleteRequest"
    >
        <template #searchFormItems>
            <el-form-item label="关键词" prop="keyword">
                <el-input v-model="searchFormModel.keyword" style="width: 400px" placeholder="请输入玩家Id或名称" clearable autofocus></el-input>
            </el-form-item>
        </template>
        <template #columns>
            <el-table-column prop="entityId" label="实体Id" width="95" sortable> </el-table-column>
            <el-table-column prop="name" label="玩家昵称" width="120" sortable> </el-table-column>
            <el-table-column prop="platformId" label="平台Id" width="215" sortable> </el-table-column>
            <el-table-column prop="platformType" label="平台类型" width="85"> </el-table-column>
            <el-table-column prop="lastOnline" label="上次在线" width="165" sortable> </el-table-column>
            <el-table-column prop="totalTimePlayed" label="总游戏时长" width="140" :formatter="format_totalTimePlayed" sortable> </el-table-column>
            <el-table-column prop="level" label="等级" width="80" sortable> </el-table-column>
            <el-table-column prop="score" label="评分" width="80" sortable> </el-table-column>
            <el-table-column prop="position" label="玩家坐标" width="130" :formatter="format_position"> </el-table-column>
            <el-table-column prop="killedZombies" label="击杀僵尸" width="105" sortable> </el-table-column>
            <el-table-column prop="killedPlayers" label="击杀玩家" width="105" sortable> </el-table-column>
            <el-table-column prop="deaths" label="死亡次数" width="105" sortable> </el-table-column>
            <el-table-column prop="expToNextLevel" label="升级所需经验" width="110"> </el-table-column>
            <el-table-column prop="ip" label="IP地址" width="135" sortable> </el-table-column>
            <el-table-column prop="ipAttribution" label="IP归属地" width="135" sortable> </el-table-column>
            <el-table-column prop="landProtectionActive" label="领地石保护状态" width="125" :formatter="format_landProtectionActive"> </el-table-column>
            <el-table-column prop="landProtectionMultiplier" label="领地石保护倍数" width="125"> </el-table-column>
            <el-table-column prop="crossplatformId" label="跨平台Id" width="320" sortable> </el-table-column>
        </template>
    </MyTableEx>
</template>

<script>
export default {
    name: 'Controls.HistoryPlayers',
};
</script>

<script setup>
import ContextMenu from '@imengyu/vue3-context-menu';
import * as sdtdConsole from '~/api/sdtd-console';
import { getHistoryPlayers, deleteHistoryPlayers } from '~/api/entity-management';
import { showInventory } from '~/components/InventoryDialog/index.js';
import myprompt from '~/utils/myprompt';
import myconfirm from '~/utils/myconfirm';
import axios from 'axios';
import * as fileHelper from '~/utils/file-helper';

const searchFormModel = reactive({
    keyword: '',
});

const tableData = ref([]);
const total = ref(0);

const getData = async (pagination) => {
    const data = await getHistoryPlayers({ ...pagination, ...searchFormModel });
    tableData.value = data.items;
    total.value = data.total;
    const items = data.items;
    if (items.length) {
        axios
            .post(
                'http://ip-api.com/batch?lang=zh-CN&fields=status,country,regionName,city',
                items.map((i) => i.ip)
            )
            .then((response) => {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    tableData.value[i].ipAttribution = `${element.country} ${element.regionName} ${element.city}`;
                }
            });
    }
};

const { copy } = useClipboard();

const formatMinute = (totalMinute) => {
    if (totalMinute < 1) {
        return '小于 1 分钟';
    }

    const day = parseInt(totalMinute / 60 / 24);
    const hour = parseInt((totalMinute / 60) % 24);
    const minute = parseInt(totalMinute % 60);
    let result = '';
    if (day > 0) {
        result = day + ' 天 ';
    }
    if (hour > 0) {
        result += hour + ' 小时 ';
    }
    if (minute > 0) {
        result += minute + ' 分钟 ';
    }
    return result;
};
const format_currentLife = (row) => {
    const value = row.currentLife;
    return formatMinute(value);
};
const format_totalTimePlayed = (row) => {
    const value = row.totalTimePlayed;
    return formatMinute(value);
};
const format_position = (row) => {
    const value = row.lastPosition;
    return `${value.x} ${value.y} ${value.z}`;
};
const format_landProtectionActive = (row) => {
    const value = row.landProtectionActive;
    return value ? '激活' : '未激活';
};
const handleContextmenu = (row, column, event) => {
    const entityId = row.entityId;
    const playerName = row.name;

    ContextMenu.showContextMenu({
        x: event.x,
        y: event.y,
        theme: 'default dark',
        items: [
            {
                label: '查看背包',
                onClick: () => {
                    showInventory(entityId, playerName);
                },
                svgIcon: '#icon-view',
                svgProps: {
                    fill: '#f60',
                },
                divided: true,
            },
            {
                label: '复制',
                children: [
                    {
                        label: '复制玩家昵称',
                        onClick: async () => {
                            await copy(playerName);
                            ElMessage.success('复制成功');
                        },
                    },
                    {
                        label: '复制玩家实体Id',
                        onClick: async () => {
                            await copy(entityId);
                            ElMessage.success('复制成功');
                        },
                    },
                    {
                        label: '复制玩家平台Id',
                        onClick: async () => {
                            await copy(row.platformId);
                            ElMessage.success('复制成功');
                        },
                    },
                    {
                        label: '复制玩家坐标',
                        onClick: async () => {
                            await copy(format_position(row));
                            ElMessage.success('复制成功');
                        },
                    },
                ],
            },
            {
                label: '封禁玩家',
                onClick: () => {
                    myprompt('e.g. 2 minutes "Time for a break" "Joel"', '封禁玩家-请输入可选参数', 'warning').then(({ value }) => {
                        sdtdConsole.telePlayer(entityId, value).then(() => {
                            ElMessage.success('发送命令成功');
                        });
                    });
                },
                divided: true,
            },
            {
                label: '设置为超级管理员',
                onClick: () => {
                    myconfirm('此操作将把选定玩家设置为超级管理员, 是否继续?', '提示', 'warning').then(() => {
                        sdtdConsole.addAdmin(entityId, 0, '超级管理员-' + playerName).then(() => {
                            ElMessage.success('发送命令成功');
                        });
                    });
                },
            },
        ],
    });
};

const handleExport = (command) => {
    switch (command) {
        case 'csv':
            fileHelper.exportCsv(tableData.value, '历史玩家', {
                entityId: '实体Id',
                name: '玩家昵称',
                platformId: '平台Id',
                platformType: '平台类型',
                lastOnline: '上次在线',
                totalTimePlayed: '总游戏时长',
                level: '等级',
                score: '评分',
                position: '玩家坐标',
                killedZombies: '击杀僵尸',
                killedPlayers: '击杀玩家',
                deaths: '死亡次数',
                expToNextLevel: '升级所需经验',
                ip: 'IP地址',
                ipAttribution: 'IP归属地',
                landProtectionActive: '领地石保护状态',
                landProtectionMultiplier: '领地石保护倍数',
                crossplatformId: '跨平台Id',
            });
            break;
        case 'json':
            fileHelper.exportJson(tableData.value, '历史玩家');
            break;
    }
};

const deleteRequest = async (row) => {
    return await deleteHistoryPlayers([row.entityId]);
};

const batchDeleteRequest = async (rows) => {
    return await deleteHistoryPlayers(rows.map((i) => i.entityId));
};
</script>
