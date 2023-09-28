import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import localeZH from 'element-plus/es/locale/lang/zh-cn';

export default (app) => {
    app.use(ElementPlus, { locale: localeZH });
};
