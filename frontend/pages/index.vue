<template>
  <section class="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
    <div>
      <p class="text-sm font-semibold uppercase text-primary-600">
        gamesvue
      </p>
      <h1 class="mt-3 text-4xl font-bold">
        tienda sencilla de videojuegos
      </h1>
      <p class="mt-4 max-w-2xl text-lg text-gray-600">
        GamesVue es una primera version visual de una tienda de videojuegos
        hecha con Nuxt y Nuxt UI usando datos mock
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <UButton to="/games" size="lg">
          ver catalogo
        </UButton>
        <UButton to="/login" color="gray" variant="soft" size="lg">
          login
        </UButton>
        <UButton to="/register" color="gray" variant="soft" size="lg">
          registro
        </UButton>
      </div>
    </div>

    <UCard>
      <div class="grid gap-4">
        <div class="rounded bg-primary-50 p-4">
          <p class="text-5xl">🎮</p>
          <h2 class="mt-4 text-xl font-semibold">frontend mock</h2>
          <p class="mt-2 text-sm text-gray-600">
            catalogo carrito login registro y panel admin con datos locales
          </p>
        </div>
        <UButton to="/games" block variant="soft">
          entrar al catalogo
        </UButton>
      </div>
    </UCard>
  </section>
</template>
