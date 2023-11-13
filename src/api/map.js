import http from '../utils/request';

/**
 * 获取地图信息
 * @returns 
 */
export const getMapInfo = () => {
    return http.get('/MapInfo');
};

/**
 * 获取切片
 * @param {Number} z zoom
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
export const getMapTile = (z, x, y) => {
    return http.get(`/MapTile/${z}/${x}/${y}`);
};
