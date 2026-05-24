<script setup>
const { loadData } = useGameStore()
const colorMode = useColorMode()

colorMode.preference = 'dark'

onMounted(async () => {
  await loadData()
  colorMode.preference = 'dark'
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <Navbar />
    <main class="mx-auto max-w-6xl px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
