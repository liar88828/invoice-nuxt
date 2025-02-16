// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // experimental: {
    //     componentIslands: true
    // },
    modules: [ "@prisma/nuxt", "@nuxtjs/tailwindcss", "nuxt-lucide-icons" ],
    lucide: { namePrefix: "Icon" },
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
 
    tailwindcss: {
        config: {
            plugins: [ require("daisyui") ],
        },
    },
})