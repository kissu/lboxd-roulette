import { build, defineNuxtConfig } from 'nuxt'
 
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            }
        }
    },
    css: ['@/assets/css/main.css',],
})
