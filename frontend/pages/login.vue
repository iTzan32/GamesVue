<script setup>
const { login, loadData } = useMockStore()

const form = reactive({
  email: '',
  password: ''
})

const error = ref('')

onMounted(() => {
  loadData()
})

const submit = async () => {
  error.value = ''

  const logged = login(form.email, form.password)

  if (!logged) {
    error.value = 'email o password incorrectos'
    return
  }

  await navigateTo('/games')
}
</script>

<template>
  <section class="mx-auto max-w-md">
    <UCard>
      <template #header>
        <div>
          <h1 class="text-2xl font-bold">login</h1>
          <p class="mt-1 text-sm text-gray-300">
            acceso simulado con usuarios mock
          </p>
        </div>
      </template>

      <form class="grid gap-4" @submit.prevent="submit">
        <UFormGroup label="email">
          <UInput v-model="form.email" type="email" placeholder="izanbelcam@icloud.com" required />
        </UFormGroup>

        <UFormGroup label="password">
          <UInput v-model="form.password" type="password" placeholder="1607" required />
        </UFormGroup>

        <UAlert v-if="error" color="red" variant="soft" :description="error" />

        <UButton type="submit" block>
          entrar
        </UButton>
      </form>
    </UCard>
  </section>
</template>
