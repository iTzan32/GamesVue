<script setup>
const {
  cart,
  cartTotal,
  currentUser,
  removeFromCart,
  loadData,
  checkoutCart
} = useGameStore()

const loading = ref(false)
const error = ref('')

onMounted(async () => {
  await loadData()
})

const checkout = async () => {
  error.value = ''
  loading.value = true

  try {
    await checkoutCart()
  } catch (checkoutError) {
    error.value = checkoutError?.data?.error || checkoutError.message || 'no se ha podido finalizar la compra'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="grid gap-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold">carrito</h1>
        <p class="mt-2 text-gray-300">
          revisa tus juegos antes de finalizar la compra
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

    <UAlert v-if="error" color="red" variant="soft" :description="error" />

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
        <UButton
          class="mt-4"
          block
          :loading="loading"
          :disabled="!currentUser"
          @click="checkout"
        >
          finalizar compra
        </UButton>
        <p v-if="!currentUser" class="mt-3 text-sm text-gray-300">
          inicia sesion para guardar la compra
        </p>
      </UCard>
    </div>
  </section>
</template>
