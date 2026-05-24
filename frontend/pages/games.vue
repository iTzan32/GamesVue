<script setup>
const { games, addToCart, loadData } = useGameStore()

const message = ref('')

onMounted(async () => {
  await loadData()
})

const addGame = (game) => {
  addToCart(game)
  message.value = `${game.title} anadido al carrito`
}
</script>

<template>
  <section class="grid gap-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold">catalogo</h1>
        <p class="mt-2 text-gray-300">
          juegos cargados desde MySQL
        </p>
      </div>
      <UButton to="/cart" variant="soft">
        ver carrito
      </UButton>
    </div>

    <UAlert v-if="message" color="green" variant="soft" :description="message" />

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
        @add="addGame"
      />
    </div>
  </section>
</template>
