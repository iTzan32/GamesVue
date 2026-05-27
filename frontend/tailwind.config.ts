// Tailwind revisa estos archivos para generar solo el CSS usado.
export default {
  // El modo oscuro se activa mediante una clase CSS.
  darkMode: 'class',
  // Rutas donde aparecen clases como bg-gray-950 o grid.
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.config.{js,ts}',
    './node_modules/@nuxt/ui/dist/runtime/components/**/*.{vue,mjs,ts}',
    './node_modules/@nuxt/ui/dist/runtime/ui.config/**/*.{mjs,js,ts}'
  ]
}
