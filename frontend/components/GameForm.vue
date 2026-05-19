<script setup>
const props = defineProps({
  game: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const emptyForm = () => ({
  title: '',
  description: '',
  genre: '',
  platform: '',
  price: 0,
  stock: 0,
  image: '🎮'
})

const form = reactive(emptyForm())

watch(
  () => props.game,
  (game) => {
    Object.assign(form, game ? { ...game } : emptyForm())
  },
  { immediate: true }
)

const save = () => {
  emit('save', { ...form })
  Object.assign(form, emptyForm())
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">
        {{ game ? 'editar juego' : 'crear juego' }}
      </h2>
    </template>

    <form class="grid gap-4" @submit.prevent="save">
      <UFormGroup label="titulo">
        <UInput v-model="form.title" required />
      </UFormGroup>

      <UFormGroup label="descripcion">
        <UTextarea v-model="form.description" required />
      </UFormGroup>

      <div class="grid gap-4 sm:grid-cols-2">
        <UFormGroup label="genero">
          <UInput v-model="form.genre" required />
        </UFormGroup>

        <UFormGroup label="plataforma">
          <UInput v-model="form.platform" required />
        </UFormGroup>
      </div>

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
