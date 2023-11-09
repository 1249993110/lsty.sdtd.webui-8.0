import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

process.env.BROWSER = 'chrome';

const pathSrc = path.resolve(__dirname, './src')

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
                    'vue-i18n',
                ],

                // Filepath to generate corresponding .d.ts file.
                // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
                // Set `false` to disable.
                dts: true,

                // Auto import inside Vue template
                // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
                vueTemplate: false,

                resolvers: [ElementPlusResolver()], // 自动导入element API
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                    }),
                ], // 导入element组件与样式
                dts: true,
            }),
        ],
        base: env.VITE_APP_BASE_URL,
        server: {
            host: 'localhost',
            port: 9526,
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
                '~/': `${pathSrc}/`,
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // define global scss variable
                    // additionalData: `@use '~/assets/styles/common.scss' as *;`,
                },
            },
        },
    };
});
