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

/**
 * 获取白名单
 * @returns
 */
export const getWhitelist = () => {
    return http.get('/ServerManagement/Whitelist');
};

/**
 * 新增白名单
 * @returns
 */
export const addWhitelist = (data) => {
    return http.post('/ServerManagement/Whitelist', data);
};

/**
 * 删除白名单
 * @returns
 */
export const deteleWhitelist = (data) => {
    return http.delete('/ServerManagement/Whitelist', { data: data });
};

/**
 * 获取黑名单
 * @returns
 */
export const getBlacklist = () => {
    return http.get('/ServerManagement/Blacklist');
};

/**
 * 新增黑名单
 * @returns
 */
export const addBlacklist = (data) => {
    return http.post('/ServerManagement/Blacklist', data);
};

/**
 * 删除黑名单
 * @returns
 */
export const deteleBlacklist = (data) => {
    return http.delete('/ServerManagement/Blacklist', { data: data });
};

/**
 * 获取本地化字典
 * @returns
 */
export const getLocalization = (language) => {
    return http.get('/ServerManagement/Localization', { params: { language: language } });
};
