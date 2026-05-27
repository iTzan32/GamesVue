<script setup>
// Acciones de sesion desde el store.
const { login, loadData } = useGameStore()

// Campos del formulario de login.
const form = reactive({
  email: '',
  password: ''
})

// Mensaje si la API rechaza el acceso.
const error = ref('')

onMounted(async () => {
  // Recupera datos guardados al abrir login.
  await loadData()
})

// Comprueba credenciales y navega al catalogo.
const submit = async () => {
  error.value = ''

  const logged = await login(form.email, form.password)

  if (!logged) {
    error.value = 'email o password incorrectos'
    return
  }

  await navigateTo('/games')
}
</script>

<template>
  <!-- Pantalla de inicio de sesion. -->
  <section class="mx-auto max-w-md">
    <UCard>
      <template #header>
        <div>
          <h1 class="text-2xl font-bold">login</h1>
          <p class="mt-1 text-sm text-gray-300">
            acceso con API PHP y MySQL
          </p>
        </div>
      </template>

      <form class="grid gap-4" @submit.prevent="submit">
        <!-- Credenciales enviadas a PHP. -->
        <UFormGroup label="email">
          <UInput v-model="form.email" type="email" placeholder="izanbelcam@icloud.com" required />
        </UFormGroup>

        <UFormGroup label="password">
          <UInput v-model="form.password" type="password" placeholder="1607" required />
        </UFormGroup>

        <UAlert v-if="error" color="red" variant="soft" :description="error" />

        <!-- Submit del formulario. -->
        <UButton type="submit" block>
          entrar
        </UButton>
      </form>
    </UCard>
  </section>
</template>
