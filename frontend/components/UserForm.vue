<script setup>
// Usuario seleccionado desde el panel admin.
const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

// Eventos para guardar o cancelar edicion.
const emit = defineEmits(['save', 'cancel'])

// Formulario reactivo de usuario.
const form = reactive({
  id: '',
  name: '',
  email: '',
  direccion: '',
  telefono: '',
  password: '',
  is_admin: 0
})

// Copia el usuario elegido y deja password vacio.
watch(
  () => props.user,
  (user) => {
    if (user) {
      Object.assign(form, { ...user, password: '' })
    }
  },
  { immediate: true }
)

// Envia datos normalizando is_admin a numero.
const save = () => {
  emit('save', { ...form, is_admin: Number(form.is_admin) })
}
</script>

<template>
  <!-- Formulario para editar usuarios. -->
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">editar usuario</h2>
    </template>

    <form v-if="user" class="grid gap-4" @submit.prevent="save">
      <!-- Datos personales editables. -->
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

      <!-- Rol del usuario en la aplicacion. -->
      <UFormGroup label="tipo">
        <USelect
          v-model="form.is_admin"
          :options="[
            { label: 'usuario normal', value: 0 },
            { label: 'administrador', value: 1 }
          ]"
        />
      </UFormGroup>

      <!-- Guardar o cancelar cambios. -->
      <div class="flex gap-2">
        <UButton type="submit">guardar</UButton>
        <UButton type="button" color="gray" variant="soft" @click="$emit('cancel')">
          cancelar
        </UButton>
      </div>
    </form>

    <!-- Mensaje cuando aun no hay usuario seleccionado. -->
    <p v-else class="text-sm text-gray-300">
      selecciona un usuario para editarlo
    </p>
  </UCard>
</template>
