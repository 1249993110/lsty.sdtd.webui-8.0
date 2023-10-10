import http from '../utils/request';

/**
 * 获取统计数据
 * @returns
 */
export const getGameStats = () => {
    return http.get('/ServerManagement/GameStats');
};

/**
 * 获取领地石
 * @returns
 */
export const getLandClaims = () => {
    return http.get('/ServerManagement/LandClaims');
};

/**
 * 发送全局消息
 * @returns
 */
export const sendGlobalMessage = (message) => {
    return http.post('/ServerManagement/SendGlobalMessage', { message, senderName: 'Server' });
};

/**
 * 执行控制台命令
 * @returns
 */
export const executeConsoleCommand = (command, inMainThread = false) => {
    return http.get('/ServerManagement/ExecuteConsoleCommand', {
        params: {
            command,
            inMainThread,
        },
    });
};

/**
 * 获取物品方块
 * @returns
 */
export const getItemBlocks = (params) => {
    return http.get('/ServerManagement/ItemBlocks', { params: params });
};
