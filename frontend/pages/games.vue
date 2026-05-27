<script setup>
// Datos del catalogo y accion de carrito.
const { games, addToCart, loadData } = useGameStore()

// Mensaje visual al anadir un juego.
const message = ref('')

onMounted(async () => {
  // Asegura que los juegos esten cargados.
  await loadData()
})

// Anade el juego y muestra confirmacion.
const addGame = (game) => {
  addToCart(game)
  message.value = `${game.title} anadido al carrito`
}
</script>

<template>
  <!-- Pagina de catalogo de juegos. -->
  <section class="grid gap-6">
    <!-- Cabecera del catalogo. -->
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

    <!-- Confirmacion temporal al comprar. -->
    <UAlert v-if="message" color="green" variant="soft" :description="message" />

    <!-- Grid responsive de tarjetas. -->
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
