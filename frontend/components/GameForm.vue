<script setup>
// Si llega un juego, el formulario edita; si no, crea.
const props = defineProps({
  game: {
    type: Object,
    default: null
  }
})

// Eventos que escucha el panel admin.
const emit = defineEmits(['save', 'cancel'])

// Valores iniciales del formulario.
const emptyForm = () => ({
  title: '',
  description: '',
  genre: '',
  platform: '',
  price: 0,
  stock: 0,
  image: '🎮'
})

// Formulario reactivo conectado a los inputs.
const form = reactive(emptyForm())

// Rellena el formulario al elegir un juego.
watch(
  () => props.game,
  (game) => {
    Object.assign(form, game ? { ...game } : emptyForm())
  },
  { immediate: true }
)

// Envia una copia limpia al componente padre.
const save = () => {
  emit('save', { ...form })
  Object.assign(form, emptyForm())
}
</script>

<template>
  <!-- Formulario de crear o editar juegos. -->
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">
        {{ game ? 'editar juego' : 'crear juego' }}
      </h2>
    </template>

    <form class="grid gap-4" @submit.prevent="save">
      <!-- Datos principales del juego. -->
      <UFormGroup label="titulo">
        <UInput v-model="form.title" required />
      </UFormGroup>

      <UFormGroup label="descripcion">
        <UTextarea v-model="form.description" required />
      </UFormGroup>

      <!-- Clasificacion del juego. -->
      <div class="grid gap-4 sm:grid-cols-2">
        <UFormGroup label="genero">
          <UInput v-model="form.genre" required />
        </UFormGroup>

        <UFormGroup label="plataforma">
          <UInput v-model="form.platform" required />
        </UFormGroup>
      </div>

      <!-- Precio, stock e icono/imagen. -->
      <div class="grid gap-4 sm:grid-cols-3">
        <UFormGroup label="precio">
          <UInput v-model.number="form.price" type="number" min="0" step="0.01" required />
        </UFormGroup>

        <UFormGroup label="stock">
          <UInput v-model.number="form.stock" type="number" min="0" required />
        </UFormGroup>

        <UFormGroup label="imagen">
          <UInput v-model="form.image" required />
        </UFormGroup>
      </div>

      <!-- Acciones del formulario. -->
      <div class="flex gap-2">
        <UButton type="submit">
          guardar
        </UButton>
        <UButton v-if="game" type="button" color="gray" variant="soft" @click="$emit('cancel')">
          cancelar
        </UButton>
      </div>
    </form>
  </UCard>
</template>
