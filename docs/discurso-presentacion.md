# Discurso de presentacion de GamesVue

## Discurso corto

Buenas, mi proyecto se llama GamesVue. Es una tienda sencilla de videojuegos hecha con Nuxt en el frontend, PHP en la API y MySQL como base de datos. La idea principal es tener una aplicacion completa: catalogo de juegos, registro, login, carrito, perfil de usuario y un panel de administracion.

La estructura esta separada por responsabilidades. En `frontend` esta la parte visual hecha con Nuxt y Vue. En `api` esta la logica PHP que recibe peticiones y trabaja con MySQL. En `database` esta el SQL inicial que crea tablas y datos de prueba. Y con Docker levanto todos los servicios: frontend, API, base de datos y phpMyAdmin.

En Nuxt, cada archivo dentro de `pages` se convierte automaticamente en una ruta. Por ejemplo, `pages/games.vue` crea `/games`, `pages/cart.vue` crea `/cart` y `pages/admin.vue` crea `/admin`. Los componentes reutilizables estan en `components`, como la barra de navegacion, las tarjetas de juegos y los formularios.

Para los datos uso un composable llamado `useGameStore`. Es como el punto central del frontend: guarda los juegos, usuarios, carrito y usuario actual. Desde ahi llamo a la API PHP con `$fetch`, guardo carrito y sesion en `localStorage`, y mantengo sincronizadas las paginas.

La API empieza en `api/index.php`, que funciona como un router sencillo. Segun la ruta, llama a los archivos de usuarios, juegos, administracion o carrito. La conexion a MySQL se hace con PDO, usando consultas preparadas para trabajar de forma mas segura con la base de datos.

La parte de compra funciona asi: el usuario anade juegos al carrito, el carrito se mantiene en el navegador, y cuando finaliza compra se envia a la API. La API comprueba usuario, stock y productos, descuenta el stock y guarda la compra en `historial_compras`.

El panel admin esta protegido a nivel visual por `is_admin`. Si el usuario tiene `is_admin = 1`, puede crear, editar y borrar juegos, y tambien gestionar usuarios. Si no es admin, la pagina muestra un aviso de acceso no disponible.

## Como funciona el CSS en Nuxt en este proyecto

En Nuxt el CSS puede venir de varias formas: un archivo CSS global, estilos dentro de cada componente, o clases escritas directamente en el HTML. En este proyecto se usa sobre todo Tailwind CSS y Nuxt UI.

Tailwind permite escribir estilos como clases dentro del `template`. Por ejemplo:

```vue
<section class="grid gap-6">
```

Aqui `grid` activa una cuadricula y `gap-6` pone separacion entre elementos.

Otro ejemplo:

```vue
<main class="mx-auto max-w-6xl px-4 py-8">
```

Esto centra el contenido, limita el ancho y aplica padding horizontal y vertical.

Tambien hay clases responsive:

```vue
<div class="flex flex-col gap-3 sm:flex-row">
```

En movil se ve en columna, pero desde el tamano `sm` cambia a fila.

Nuxt UI aporta componentes ya disenados como `UButton`, `UCard`, `UAlert`, `UBadge`, `UInput` y `UFormGroup`. Por eso no hay mucho CSS manual: los componentes ya traen una base visual, y yo ajusto el layout con clases de Tailwind.

El archivo `tailwind.config.ts` le dice a Tailwind donde buscar clases CSS. Si Tailwind ve clases en `pages`, `components` o `app.vue`, genera el CSS necesario. El archivo `nuxt.config.ts` carga el modulo `@nuxt/ui`, que integra estos componentes y estilos dentro de Nuxt.

El modo oscuro se controla con `colorMode` y con clases como `bg-gray-950` y `text-gray-100`. En `app.vue` se fuerza la preferencia `dark`, por eso toda la aplicacion aparece en tema oscuro.

Frase facil para decir:

> En este proyecto no tengo un CSS grande separado, porque uso Tailwind y Nuxt UI. Tailwind me permite maquetar con clases dentro del template y Nuxt UI me da componentes ya preparados como botones, tarjetas y formularios.

## Que hace cada archivo

`docker-compose.yml`: levanta los contenedores del proyecto. Conecta Nuxt, PHP, MySQL y phpMyAdmin.

`docker/frontend/Dockerfile`: prepara el contenedor del frontend con Node, instala dependencias y arranca Nuxt.

`docker/api/Dockerfile`: prepara PHP con Apache e instala PDO MySQL para conectar con la base de datos.

`database/init/BBDD.sql`: crea la base de datos, tablas, usuarios de prueba, juegos iniciales e historial de compras.

`api/config/database.php`: centraliza la conexion PDO con MySQL usando variables de entorno.

`api/index.php`: entrada principal de la API. Lee la ruta y decide que controlador ejecutar.

`api/usuarios.php`: gestiona login y registro. Comprueba passwords y crea usuarios normales.

`api/juegos.php`: gestiona el CRUD de juegos: listar, crear, editar y borrar.

`api/admin.php`: gestiona usuarios desde el panel admin: listar, editar y borrar.

`api/carrito.php`: finaliza compras. Valida carrito, comprueba stock, descuenta unidades y guarda historial.

`frontend/package.json`: define dependencias y comandos del frontend, como `npm run dev`.

`frontend/package-lock.json`: archivo generado por npm para fijar versiones exactas. No hace falta explicarlo mucho.

`frontend/nuxt.config.ts`: configuracion principal de Nuxt. Carga Nuxt UI, la URL de la API y el modo oscuro.

`frontend/tailwind.config.ts`: indica a Tailwind que archivos debe analizar para generar CSS.

`frontend/app.vue`: layout global. Muestra la barra de navegacion y la pagina activa con `NuxtPage`.

`frontend/composables/useGameStore.js`: store global. Guarda estado, llama a la API y contiene las acciones principales.

`frontend/components/Navbar.vue`: barra superior con enlaces, login, registro, perfil y admin si corresponde.

`frontend/components/GameCard.vue`: tarjeta de cada juego del catalogo.

`frontend/components/CartItem.vue`: linea del carrito con cantidad, subtotal y boton de eliminar.

`frontend/components/GameForm.vue`: formulario para crear o editar juegos desde admin.

`frontend/components/UserForm.vue`: formulario para editar usuarios desde admin.

`frontend/pages/index.vue`: portada simple del proyecto.

`frontend/pages/games.vue`: catalogo. Carga juegos y permite anadirlos al carrito.

`frontend/pages/cart.vue`: carrito. Muestra productos, total y finaliza compra.

`frontend/pages/login.vue`: login. Envia email y password a la API.

`frontend/pages/register.vue`: registro. Crea usuarios nuevos.

`frontend/pages/profile.vue`: perfil. Permite editar datos del usuario actual.

`frontend/pages/admin.vue`: panel admin. Gestiona juegos y usuarios.

`docs/desarrollo.md`: documentacion general del proyecto.

## Que puedes omitir o resumir

Puedes decir que `node_modules` se instala automaticamente con `npm install`. No hace falta explicar su contenido.

Puedes decir que `.nuxt` y `.output`, si aparecen, son carpetas generadas por Nuxt al desarrollar o compilar.

Puedes decir que `package-lock.json` lo genera npm para bloquear versiones exactas de dependencias.

Puedes decir que componentes como `UButton`, `UCard`, `UAlert`, `UInput` y `UBadge` vienen de Nuxt UI, no los has programado desde cero.

Puedes decir que funciones como `ref`, `reactive`, `computed`, `onMounted`, `navigateTo`, `useState`, `useRuntimeConfig` y `$fetch` son utilidades de Vue/Nuxt que se autoimportan.

Puedes decir que `NuxtPage` y `NuxtLink` son componentes propios de Nuxt. `NuxtPage` pinta la pagina actual y `NuxtLink` sirve para navegar entre rutas.

Puedes decir que las clases de Tailwind como `grid`, `flex`, `gap-4`, `text-gray-300` o `sm:flex-row` no son clases creadas una por una, sino utilidades que Tailwind genera.

## Orden recomendado para exponer

1. Presentar la idea: tienda de videojuegos.
2. Explicar arquitectura: Nuxt, PHP, MySQL y Docker.
3. Enseñar rutas del frontend en `pages`.
4. Enseñar componentes reutilizables en `components`.
5. Explicar `useGameStore` como centro de datos.
6. Explicar API PHP y base de datos.
7. Hacer demo: catalogo, carrito, login, perfil y admin.
8. Cerrar con CSS: Tailwind para clases rapidas y Nuxt UI para componentes ya disenados.

## Mini chuleta de demo

Admin:

```text
email: izanbelcam@icloud.com
password: 1607
```

Usuario normal:

```text
email: adrian@gmail.com
password: 12345678
```

URLs:

```text
Frontend: http://localhost:3000
API: http://localhost:8080
phpMyAdmin: http://localhost:8081
```
