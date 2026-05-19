<script setup>
const { currentUser, isAdmin, logout } = useMockStore()

const closeSession = async () => {
  logout()
  await navigateTo('/')
}
</script>

<template>
  <header class="border-b border-gray-800 bg-gray-950">
    <nav class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <NuxtLink to="/" class="text-xl font-bold text-primary-400">
        GamesVue
      </NuxtLink>

      <div class="flex flex-wrap items-center gap-2">
        <UButton to="/games" variant="ghost" color="gray">
          catalogo
        </UButton>
        <UButton to="/cart" variant="ghost" color="gray">
          carrito
        </UButton>
        <UButton v-if="isAdmin" to="/admin" variant="ghost" color="gray">
          admin
        </UButton>
        <UButton v-if="!currentUser" to="/login" variant="soft">
          login
        </UButton>
        <UButton v-if="!currentUser" to="/register" variant="solid">
          registro
        </UButton>
        <div v-else class="flex items-center gap-2">
          <span class="text-sm text-gray-300">{{ currentUser.name }}</span>
          <UButton color="gray" variant="soft" @click="closeSession">
            salir
          </UButton>
        </div>
      </div>
    </nav>
  </header>
</template>
