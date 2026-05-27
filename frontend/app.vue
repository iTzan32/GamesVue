<script setup>
// Store global de juegos, usuarios y carrito.
const { loadData } = useGameStore()
// Controla el tema claro/oscuro de Nuxt UI.
const colorMode = useColorMode()

// La aplicacion siempre arranca en modo oscuro.
colorMode.preference = 'dark'

onMounted(async () => {
  // Carga datos iniciales cuando el navegador monta la app.
  await loadData()
  colorMode.preference = 'dark'
})
</script>

<template>
  <!-- Layout base que envuelve todas las paginas. -->
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <Navbar />
    <main class="mx-auto max-w-6xl px-4 py-8">
      <!-- Nuxt cambia este contenido segun la ruta actual. -->
      <NuxtPage />
    </main>
  </div>
</template>
