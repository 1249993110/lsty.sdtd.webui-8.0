import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

process.env.BROWSER = 'chrome';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            vue(),
            AutoImport({
                // targets to transform
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/, // .md
                ],

                // global imports to register
                imports: [
                    // presets
                    'vue',
                    'vue-router',
                    'pinia',
                    '@vueuse/core',
                ],

                // Filepath to generate corresponding .d.ts file.
                // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
                // Set `false` to disable.
                dts: true,

                // Auto import inside Vue template
                // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
                vueTemplate: false,

                // resolvers: [ElementPlusResolver()], // 已全局引入, 无需再按需引入
            }),
            Components({
                resolvers: [ElementPlusResolver()], // 生成 ElementPlus 组件 ts 语法提示
                dts: true,
            }),
        ],
        base: env.VITE_APP_BASE_URL,
        server: {
            host: 'localhost',
            port: 9527,
            open: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:5218',
                    changeOrigin: true,
                },
                '/swagger': {
                    target: 'http://localhost:5218',
                    changeOrigin: true,
                },
                '/EventHub': {
                    target: 'http://localhost:5218',
                    changeOrigin: true,
                    ws: true,
                },
            },
        },
        build: {
            // sourcemap: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});
