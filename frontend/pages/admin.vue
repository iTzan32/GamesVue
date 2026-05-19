<script setup>
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
} = useMockStore()

const selectedGame = ref(null)
const selectedUser = ref(null)
const ready = ref(false)

onMounted(() => {
  loadData()
  ready.value = true
})

const saveGame = (game) => {
  if (selectedGame.value) {
    updateGame(game)
  } else {
    createGame(game)
  }

  selectedGame.value = null
}

const saveUser = (user) => {
  updateUser(user)
  selectedUser.value = null
}
</script>

<template>
  <section class="grid gap-6">
    <div>
      <h1 class="text-3xl font-bold">panel admin</h1>
      <p class="mt-2 text-gray-600">
        gestion local de juegos y usuarios
      </p>
    </div>

    <UAlert
      v-if="!ready"
      variant="soft"
      description="cargando datos locales"
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
      <section class="grid gap-4">
        <GameForm
          :game="selectedGame"
          @save="saveGame"
          @cancel="selectedGame = null"
        />

        <div class="grid gap-3">
          <h2 class="text-xl font-semibold">juegos</h2>
          <UCard v-for="game in games" :key="game.id">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-semibold">{{ game.image }} {{ game.title }}</p>
                <p class="text-sm text-gray-600">
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

      <section class="grid gap-4">
        <UserForm
          :user="selectedUser"
          @save="saveUser"
          @cancel="selectedUser = null"
        />

        <div class="grid gap-3">
          <h2 class="text-xl font-semibold">usuarios</h2>
          <UCard v-for="user in users" :key="user.id">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-semibold">{{ user.name }}</p>
                <p class="text-sm text-gray-600">
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
