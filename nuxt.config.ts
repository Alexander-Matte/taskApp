// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-bootstrap-icons', 
    '@nuxtjs/supabase',
    'usebootstrap',
  ],

  usebootstrap: {
    bootstrap: {
      prefix: ''
    },
    html: {
      prefix: 'B'
    },
  },

  css: [
    'bootstrap/scss/bootstrap.scss',
    '~/assets/css/main.css'
  ],

  supabase: {
    // Configure your Supabase options here
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: [],
      cookieRedirect: true,
    },

    redirect: false, // Turn off the default redirect behavior
  },

  // Ensure that pages auto-importing is enabled
  pages: true,

  compatibilityDate: '2024-07-12',
});