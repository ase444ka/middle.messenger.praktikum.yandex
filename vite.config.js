import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nested'

export default defineConfig({
    server: {
      port: 3000
    }, 
    css: {
      postcss: {
        plugins: [
          postcssNesting
        ]
      }
    }
  }) 