import axios from 'axios';
import nProgress from '../plugins/nprogress';
import { ElMessage } from 'element-plus';
import qs from 'qs';
import { useUserInfoStore } from '../store/user-info';

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: import.meta.env.VITE_APP_API_TIMEOUT,
    paramsSerializer: {
        serialize: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        },
    },
});

service.interceptors.request.use(
    (config) => {
        nProgress.start();
        config.headers['access-token'] = useUserInfoStore().accessToken;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        nProgress.done();
        return response.data;
    },
    (error) => {
        nProgress.done();
        if (!error.response) {
            ElMessage.error(error.message);
            return Promise.reject(error);
        }

        switch (error.response.status) {
            case 401:
                useUserInfoStore().clear();
                location.reload();
                break;
            case 403:
                break;
            case 404:
                ElMessage.error('请求的资源不存在!');
                break;
            case 400:
                ElMessage.error(error.response.data.title ?? error.response.data ?? 'Bad Request');
                break;
            case 500:
                ElMessage.error(error.response.data.message ?? 'Internal Server Error');
                break;
            default:
                ElMessage.error(error.message);
        }

        return Promise.reject(error);
    }
);

export default service;
