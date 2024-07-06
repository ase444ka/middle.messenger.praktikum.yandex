import {resolve} from 'path';
import {defineConfig} from 'vite';
import postcssNesting from 'postcss-nested';
import handlebars from 'vite-plugin-handlebars';
import pageData from './src/data/user.js';



export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        user: resolve(__dirname, 'src/pages/user_page/index.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
});
