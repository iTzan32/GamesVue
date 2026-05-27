<script setup>
// Datos de sesion y permisos para pintar el menu.
const { currentUser, isAdmin, logout } = useGameStore()

// Cierra sesion y vuelve a la portada.
const closeSession = async () => {
  logout()
  await navigateTo('/')
}
</script>

<template>
  <!-- Barra comun de navegacion. -->
  <header class="border-b border-gray-800 bg-gray-950">
    <nav class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <NuxtLink to="/" class="text-xl font-bold text-primary-400">
        GamesVue
      </NuxtLink>

      <!-- Enlaces principales segun login y rol. -->
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
        <!-- Si hay usuario, se muestra perfil y salir. -->
        <div v-else class="flex items-center gap-2">
          <UButton to="/profile" color="gray" variant="ghost">
            {{ currentUser.name }}
          </UButton>
          <UButton color="gray" variant="soft" @click="closeSession">
            salir
          </UButton>
        </div>
      </div>
    </nav>
  </header>
</template>
