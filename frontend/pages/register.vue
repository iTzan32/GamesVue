<script setup>
// Registro de usuarios desde el store.
const { registerUser, loadData } = useGameStore()

// Campos del nuevo usuario.
const form = reactive({
  name: '',
  email: '',
  password: ''
})

// Mensajes de resultado.
const message = ref('')
const error = ref('')

onMounted(async () => {
  // Mantiene sincronizados datos locales.
  await loadData()
})

// Crea usuario y entra al catalogo.
const submit = async () => {
  message.value = ''
  error.value = ''

  const created = await registerUser(form)

  if (!created) {
    error.value = 'ya existe un usuario con ese email'
    return
  }

  await navigateTo('/games')
}
</script>

<template>
  <!-- Pantalla de registro. -->
  <section class="mx-auto max-w-md">
    <UCard>
      <template #header>
        <div>
          <h1 class="text-2xl font-bold">registro</h1>
          <p class="mt-1 text-sm text-gray-300">
            los usuarios nuevos se guardan en MySQL
          </p>
        </div>
      </template>

      <form class="grid gap-4" @submit.prevent="submit">
        <!-- Datos basicos de alta. -->
        <UFormGroup label="nombre">
          <UInput v-model="form.name" required />
        </UFormGroup>

        <UFormGroup label="email">
          <UInput v-model="form.email" type="email" required />
        </UFormGroup>

        <UFormGroup label="password">
          <UInput v-model="form.password" type="password" required />
        </UFormGroup>

        <UAlert v-if="message" color="green" variant="soft" :description="message" />
        <UAlert v-if="error" color="red" variant="soft" :description="error" />

        <!-- Envia el registro a la API. -->
        <UButton type="submit" block>
          crear usuario
        </UButton>
      </form>
    </UCard>
  </section>
</template>
