<script setup>
const { currentUser, loadData, logout, updateUser } = useGameStore()

const form = reactive({
  id: '',
  name: '',
  email: '',
  direccion: '',
  telefono: '',
  password: ''
})

const loading = ref(false)
const message = ref('')
const error = ref('')

watch(
  currentUser,
  (user) => {
    if (user) {
      Object.assign(form, {
        id: user.id,
        name: user.name,
        email: user.email,
        direccion: user.direccion || '',
        telefono: user.telefono || '',
        password: ''
      })
    }
  },
  { immediate: true }
)

onMounted(async () => {
  await loadData()
})

const saveProfile = async () => {
  message.value = ''
  error.value = ''
  loading.value = true

  try {
    await updateUser({ ...form })
    form.password = ''
    message.value = 'perfil actualizado'
  } catch {
    error.value = 'no se ha podido actualizar el perfil'
  } finally {
    loading.value = false
  }
}

const closeSession = async () => {
  logout()
  await navigateTo('/')
}
</script>

<template>
  <section class="mx-auto max-w-2xl">
    <UCard>
      <template #header>
        <div>
          <h1 class="text-2xl font-bold">perfil</h1>
          <p class="mt-1 text-sm text-gray-300">
            datos de tu cuenta
          </p>
        </div>
      </template>

      <form v-if="currentUser" class="grid gap-4" @submit.prevent="saveProfile">
        <UFormGroup label="nombre">
          <UInput v-model="form.name" required />
        </UFormGroup>

        <UFormGroup label="email">
          <UInput v-model="form.email" type="email" required />
        </UFormGroup>

        <UFormGroup label="direccion">
          <UInput v-model="form.direccion" />
        </UFormGroup>

        <UFormGroup label="telefono">
          <UInput v-model="form.telefono" />
        </UFormGroup>

        <UFormGroup label="password">
          <UInput v-model="form.password" type="password" placeholder="dejar vacio para no cambiarlo" />
        </UFormGroup>

        <UAlert v-if="message" color="green" variant="soft" :description="message" />
        <UAlert v-if="error" color="red" variant="soft" :description="error" />

        <div class="flex flex-wrap gap-3">
          <UButton type="submit" :loading="loading">
            guardar cambios
          </UButton>
          <UButton to="/games" color="gray" variant="soft">
            ir al catalogo
          </UButton>
          <UButton color="gray" variant="soft" @click="closeSession">
            salir
          </UButton>
        </div>
      </form>

      <div v-else class="grid gap-4">
        <UAlert
          color="yellow"
          variant="soft"
          description="inicia sesion para ver tu perfil"
        />
        <UButton to="/login">
          login
        </UButton>
      </div>
    </UCard>
  </section>
</template>
