import http from '../utils/request';

/**
 * 获取聊天记录
 * @returns
 */
export const getChatRecord = (params) => {
    return http.get('/ChatRecord', { params: params });
};
