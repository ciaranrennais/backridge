// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    runtimeConfig: {
        MONGO_URI: process.env.MONGO_URI
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    // register nitro plugin
    nitro: {
        plugins: ["@/server/db/index.ts"],
    },
    build: {
        transpile: ["@vuepic/vue-datepicker"],
    },
    app : {
        head: {
            title: 'Backridge Data Compliance',
            meta: [
                { name: 'description', content: 'Backridge Data Compliance' }
            ],
            link: [
                {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
            ]
        }
    }
})
