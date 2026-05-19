<script setup>
defineProps({
  game: {
    type: Object,
    required: true
  }
})

defineEmits(['add'])
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-4xl">{{ game.image }}</p>
          <h2 class="mt-3 text-lg font-semibold">{{ game.title }}</h2>
        </div>
        <UBadge :color="game.stock > 0 ? 'green' : 'red'" variant="soft">
          {{ game.stock > 0 ? `${game.stock} en stock` : 'sin stock' }}
        </UBadge>
      </div>
    </template>

    <p class="text-sm text-gray-600">{{ game.description }}</p>

    <div class="mt-4 flex flex-wrap gap-2">
      <UBadge color="gray" variant="soft">{{ game.genre }}</UBadge>
      <UBadge color="gray" variant="soft">{{ game.platform }}</UBadge>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-3">
        <p class="text-lg font-bold">{{ game.price.toFixed(2) }} €</p>
        <UButton :disabled="game.stock === 0" @click="$emit('add', game)">
          {{ game.stock === 0 ? 'sin stock' : 'anadir' }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
