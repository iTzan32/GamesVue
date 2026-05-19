<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['remove'])
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <span class="text-3xl">{{ item.image }}</span>
        <div>
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-gray-600">
            cantidad {{ item.quantity }} x {{ item.price.toFixed(2) }} €
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 sm:justify-end">
        <p class="font-bold">{{ (item.price * item.quantity).toFixed(2) }} €</p>
        <UButton color="red" variant="soft" @click="$emit('remove', item.id)">
          eliminar
        </UButton>
      </div>
    </div>
  </UCard>
</template>
