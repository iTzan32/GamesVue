// Configuracion principal del frontend Nuxt.
export default defineNuxtConfig({
  // Fecha de compatibilidad que fija el comportamiento de Nuxt.
  compatibilityDate: '2025-05-15',
  // Activa herramientas de desarrollo en local.
  devtools: { enabled: true },
  // Nuxt UI aporta componentes y estilos basados en Tailwind.
  modules: ['@nuxt/ui'],
  // Variables disponibles desde el navegador.
  runtimeConfig: {
    public: {
      // URL base de la API PHP.
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/index.php'
    }
  },
  // Tema oscuro por defecto en toda la interfaz.
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  }
})
