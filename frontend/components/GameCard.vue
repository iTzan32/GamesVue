<script setup>
// Recibe un juego para mostrarlo en una tarjeta.
defineProps({
  game: {
    type: Object,
    required: true
  }
})

// Avisa a la pagina cuando se pulsa anadir.
defineEmits(['add'])
</script>

<template>
  <!-- Tarjeta reutilizable de producto. -->
  <UCard>
    <template #header>
      <!-- Imagen, titulo y estado de stock. -->
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-4xl">{{ game.image }}</p>
          <h2 class="mt-3 text-lg font-semibold text-gray-100">{{ game.title }}</h2>
        </div>
        <UBadge :color="game.stock > 0 ? 'green' : 'red'" variant="soft">
          {{ game.stock > 0 ? `${game.stock} en stock` : 'sin stock' }}
        </UBadge>
      </div>
    </template>

    <p class="text-sm text-gray-300">{{ game.description }}</p>

    <!-- Etiquetas de genero y plataforma. -->
    <div class="mt-4 flex flex-wrap gap-2">
      <UBadge color="gray" variant="soft">{{ game.genre }}</UBadge>
      <UBadge color="gray" variant="soft">{{ game.platform }}</UBadge>
    </div>

    <template #footer>
      <!-- Precio y accion del carrito. -->
      <div class="flex items-center justify-between gap-3">
        <p class="text-lg font-bold text-gray-100">{{ game.price.toFixed(2) }} €</p>
        <UButton :disabled="game.stock === 0" @click="$emit('add', game)">
          {{ game.stock === 0 ? 'sin stock' : 'anadir' }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
