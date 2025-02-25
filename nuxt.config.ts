export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  plugins: [
    '~/plugins/redirect.js',
  ],
  css: [
    '@/assets/styles/global.css',
  ],
});