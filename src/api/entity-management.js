import http from '../utils/request';

/**
 * 获取所有在线玩家
 * @returns
 */
export const getOnlinePlayers = () => {
    return http.get('/EntityManagement/OnlinePlayers');
};

/**
 * 分页获取历史玩家
 * @returns
 */
export const getHistoryPlayers = () => {
    return http.get('/EntityManagement/HistoryPlayers');
};

/**
 * 获取玩家背包
 * @returns
 */
export const getPlayerInventory = (entityId) => {
    return http.get('/EntityManagement/PlayerInventory/' + entityId);
};


/**
 * 获取僵尸位置
 * @returns
 */
export const getHostilesLocation = () => {
    return http.get('/EntityManagement/HostilesLocation');
};

/**
 * 获取动物位置
 * @returns
 */
export const getAnimalsLocation = () => {
    return http.get('/EntityManagement/AnimalsLocation');
};

/**
 * 获取玩家位置
 * @returns
 */
export const getPlayersLocation = (status = 'all') => {
    return http.get(`/EntityManagement/PlayersLocation?status=${status}`);
};
