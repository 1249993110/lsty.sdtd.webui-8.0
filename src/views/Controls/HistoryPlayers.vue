<template>
    <div class="history-players">
        <div class="search-container">
            <el-input class="input" v-model="queryParams.keyword" placeholder="请输入玩家Id或名称" clearable @keyup.enter.native="getData"></el-input>
            <el-button class="button" type="primary" @click="getData">
                <template #icon><Icon name="search" /></template>
                查 询
            </el-button>
        </div>
        <div class="table-container">
            <el-table :data="tableData" border stripe height="100%" highlight-current-row ref="tableRef" @row-contextmenu="onContextmenu">
                <el-table-column type="index" label="序号" width="60"> </el-table-column>
                <el-table-column prop="entityId" label="实体Id" width="95" sortable> </el-table-column>
                <el-table-column prop="name" label="玩家昵称" width="115" sortable> </el-table-column>
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
                <el-table-column prop="landProtectionActive" label="领地石保护状态" width="165" :formatter="format_landProtectionActive"> </el-table-column>
                <el-table-column prop="landProtectionMultiplier" label="领地石保护倍数" width="165"> </el-table-column>
                <el-table-column prop="crossplatformId" label="跨平台Id" width="215" sortable> </el-table-column>
            </el-table>
        </div>
        <el-pagination
            style="margin-top: 8px"
            background
            @size-change="getData"
            @current-change="getData"
            :page-sizes="[5, 10, 20, 50, 100]"
            v-model:current-page="queryParams.pageNumber"
            v-model:page-size="queryParams.pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Controls.HistoryPlayers',
};
</script>

<script setup>
import ContextMenu from '@imengyu/vue3-context-menu';
import * as sdtdConsole from '~/api/sdtd-console';
import { getHistoryPlayers } from '~/api/entity-management';
import { showInventory } from '~/components/Inventory/index.js';
import myprompt from '~/utils/myprompt';
import myconfirm from '~/utils/myconfirm';
import axios from 'axios';

const tableData = ref([]);

const queryParams = reactive({
    pageNumber: 1,
    pageSize: 10,
    keyword: '',
    order: '',
    desc: true,
});
const total = ref(0);

const getData = () => {
    getHistoryPlayers(queryParams).then((data) => {
        tableData.value = data.items;
        total.value = data.total;
        data = data.items;
        if (data.length) {
            axios
                .post(
                    'http://ip-api.com/batch?lang=zh-CN&fields=status,country,regionName,city',
                    data.map((i) => i.ip)
                )
                .then((response) => {
                    const data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        tableData.value[i].ipAttribution = `${element.country} ${element.regionName} ${element.city}`;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });
};

getData();

const tableRef = ref();
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
const onContextmenu = (row, column, event) => {
    event.preventDefault();
    tableRef.value.setCurrentRow(row);

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
</script>

<style scoped lang="scss">
.history-players {
    height: 100%;
    .search-container {
        display: flex;
        .input {
            width: 400px;
        }
        .button {
            margin-left: 8px;
        }
    }
    .table-container {
        height: calc(100% - 84px);
        margin-top: 8px;
    }
}
</style>
