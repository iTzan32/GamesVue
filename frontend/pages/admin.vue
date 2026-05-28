<script setup>
// Store con datos y operaciones de administracion.
const {
  games,
  users,
  currentUser,
  isAdmin,
  loadData,
  createGame,
  updateGame,
  deleteGame,
  updateUser,
  deleteUser
} = useGameStore()

// Elementos seleccionados para editar.
const selectedGame = ref(null)
const selectedUser = ref(null)
// Evita mostrar errores antes de cargar datos.
const ready = ref(false)

onMounted(async () => {
  // Carga juegos, usuario actual y usuarios si es admin.
  await loadData()
  ready.value = true
})

// Crea o actualiza juegos segun haya seleccion.
const saveGame = async (game) => {
  if (selectedGame.value) {
    await updateGame(game)
  } else {
    await createGame(game)
  }
  selectedGame.value = null
}

// Guarda cambios del usuario seleccionado.
const saveUser = async (user) => {
  await updateUser(user)
  selectedUser.value = null
}
</script>

<template>
  <!-- Panel privado para administradores. -->
  <section class="grid gap-6">
    <div>
      <h1 class="text-3xl font-bold">panel admin</h1>
      <p class="mt-2 text-gray-300">
        gestion de juegos y usuarios en MySQL
      </p>
    </div>

    <!-- Estados de carga y permisos. -->
    <UAlert
      v-if="!ready"
      variant="soft"
      description="cargando datos de la API"
    />

    <UAlert
      v-else-if="!currentUser"
      color="red"
      variant="soft"
      title="acceso no disponible"
      description="inicia sesion como admin para entrar"
    />

    <UAlert
      v-else-if="!isAdmin"
      color="red"
      variant="soft"
      title="acceso no disponible"
      description="solo un usuario con is_admin igual a 1 puede gestionar datos"
    />

    <div v-else class="grid gap-8">
      <!-- Gestion de juegos. -->
      <section class="grid gap-4">
        <GameForm
          :game="selectedGame"
          @save="saveGame"
          @cancel="selectedGame = null"
        />

        <div class="grid gap-3">
          <h2 class="text-xl font-semibold">juegos</h2>
          <!-- Lista editable del catalogo. -->
          <UCard v-for="game in games" :key="game.id">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-semibold">{{ game.image }} {{ game.title }}</p>
                <p class="text-sm text-gray-300">
                  {{ game.platform }} · {{ game.price.toFixed(2) }} € · stock {{ game.stock }}
                </p>
              </div>
              <div class="flex gap-2">
                <UButton color="gray" variant="soft" @click="selectedGame = { ...game }">
                  editar
                </UButton>
                <UButton color="red" variant="soft" @click="deleteGame(game.id)">
                  borrar
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Gestion de usuarios. -->
      <section class="grid gap-4">
        <UserForm
          :user="selectedUser"
          @save="saveUser"
          @cancel="selectedUser = null"
        />

        <div class="grid gap-3">
          <h2 class="text-xl font-semibold">usuarios</h2>
          <!-- Lista editable de usuarios. -->
          <UCard v-for="user in users" :key="user.id">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-semibold">{{ user.name }}</p>
                <p class="text-sm text-gray-300">
                  {{ user.email }} · is_admin {{ user.is_admin }}
                </p>
              </div>
              <div class="flex gap-2">
                <UButton color="gray" variant="soft" @click="selectedUser = { ...user }">
                  editar
                </UButton>
                <UButton color="red" variant="soft" @click="deleteUser(user.id)">
                  borrar
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </section>
    </div>
  </section>
</template>
