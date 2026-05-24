<script setup>
const { registerUser, loadData } = useGameStore()

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const message = ref('')
const error = ref('')

onMounted(async () => {
  await loadData()
})

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

        <UButton type="submit" block>
          crear usuario
        </UButton>
      </form>
    </UCard>
  </section>
</template>
