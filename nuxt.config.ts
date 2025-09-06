// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/turnstile'
  ],

  css: ['@/assets/css/index.css'],

  runtimeConfig: {
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY, 
    },
    public: {
      apiUrl: process.env.API_URL,
      turnstile: {
        siteKey: process.env.TURNSTILE_SITE_KEY, 
      }
    },
  }
})
