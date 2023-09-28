import http from '../utils/request';

/**
 * 登录
 * @returns
 */
export const login = () => {
    return http.post('/Account/Login');
};

/**
 * 注销
 * @returns
 */
export const logout = () => {
    return http.delete('/Account/Logout');
};
