<script setup>
// Recibe una linea del carrito.
defineProps({
  item: {
    type: Object,
    required: true
  }
})

// Avisa a la pagina para borrar el producto.
defineEmits(['remove'])
</script>

<template>
  <!-- Producto dentro del carrito. -->
  <UCard>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <!-- Datos basicos del juego comprado. -->
      <div class="flex items-center gap-3">
        <span class="text-3xl">{{ item.image }}</span>
        <div>
          <h2 class="font-semibold text-gray-100">{{ item.title }}</h2>
          <p class="text-sm text-gray-300">
            cantidad {{ item.quantity }} x {{ item.price.toFixed(2) }} €
          </p>
        </div>
      </div>

      <!-- Subtotal y boton de eliminar. -->
      <div class="flex items-center justify-between gap-4 sm:justify-end">
        <p class="font-bold text-gray-100">{{ (item.price * item.quantity).toFixed(2) }} €</p>
        <UButton color="red" variant="soft" @click="$emit('remove', item.id)">
          eliminar
        </UButton>
      </div>
    </div>
  </UCard>
</template>
