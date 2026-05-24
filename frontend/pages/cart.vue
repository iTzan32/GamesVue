<script setup>
const { cart, cartTotal, removeFromCart, loadData } = useGameStore()

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <section class="grid gap-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold">carrito</h1>
        <p class="mt-2 text-gray-300">
          carrito guardado en localStorage
        </p>
      </div>
      <UButton to="/games" variant="soft">
        seguir comprando
      </UButton>
    </div>

    <UAlert
      v-if="cart.length === 0"
      variant="soft"
      description="el carrito esta vacio"
    />

    <div v-else class="grid gap-4">
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @remove="removeFromCart"
      />

      <UCard>
        <div class="flex items-center justify-between">
          <p class="text-lg font-semibold">total</p>
          <p class="text-2xl font-bold">{{ cartTotal.toFixed(2) }} €</p>
        </div>
        <p class="mt-3 text-sm text-gray-300">
          no hay pagos reales en esta version
        </p>
      </UCard>
    </div>
  </section>
</template>
