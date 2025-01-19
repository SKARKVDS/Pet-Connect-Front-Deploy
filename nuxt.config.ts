// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {

    },

    css: ["~/assets/css/main.css"],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "@pinia/nuxt",
        "@vueuse/nuxt",
        "@nuxt/icon",
        "@nuxt/fonts",
        "@vee-validate/nuxt",
        "@morev/vue-transitions/nuxt",
        "@samk-dev/nuxt-vcalendar"
    ],

    tailwindcss: {
        exposeConfig: true,
        editorSupport: true,
    },

    colorMode: {
        classSuffix: "",
    },

    imports: {
        imports: [{
            from: "tailwind-variants",
            name: "tv",
        }, {
            from: "tailwind-variants",
            name: "VariantProps",
            type: true,
        }, {
            from: "vue-sonner",
            name: "toast",
            as: "useSonner"
        }],
    },

    compatibilityDate: "2024-12-18",

    build: {
        transpile: ["vue-sonner"]
    },

    extends: [
        './layers/proposals',
        './layers/service',
        './layers/memories',
    ],

    devtools: {enabled: false}
});