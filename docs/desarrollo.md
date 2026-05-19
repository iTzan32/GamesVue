# desarrollo de GamesVue

## fase actual

En esta fase se ha creado la primera version visual del frontend

Hay paginas para home login registro catalogo carrito y panel admin

Todo funciona con datos mock guardados en el navegador con localStorage

No hay conexion con PHP ni con MySQL en esta parte

## que es Nuxt

Nuxt es el framework usado para crear el frontend de GamesVue

Esta basado en Vue y ayuda a ordenar el proyecto con carpetas claras

Una pagina en Nuxt es un archivo dentro de `pages`

Por ejemplo `pages/games.vue` crea la ruta `/games`

## que es un componente

Un componente es una parte reutilizable de la interfaz

En GamesVue se usan componentes para la barra de navegacion las tarjetas de juegos los formularios y los elementos del carrito

Asi las paginas quedan mas limpias y el codigo es mas facil de explicar

## que es Nuxt UI

Nuxt UI es una libreria de componentes visuales para Nuxt

Se usa para tener botones tarjetas formularios avisos y navegacion ya preparados

Esto evita hacer mucho CSS manual y permite centrar el trabajo en Vue rutas componentes datos mock y funcionamiento de la tienda

## datos mock

Los datos mock son datos falsos usados para probar la aplicacion sin base de datos real

Los juegos estan en `data/mockGames.js`

Los usuarios estan en `data/mockUsers.js`

Estos datos permiten probar el catalogo el login el carrito y el panel admin

## login simulado

El login busca el email y el password dentro de los usuarios mock

Si los datos coinciden se guarda el usuario actual en localStorage

Asi la aplicacion recuerda quien ha iniciado sesion aunque se recargue la pagina

## is_admin

`is_admin` indica el tipo de usuario

`is_admin = 0` es un usuario normal

`is_admin = 1` es un administrador

El usuario normal puede ver juegos y usar el carrito

El administrador tambien puede entrar al panel admin y gestionar juegos y usuarios

## carrito mock

El carrito guarda juegos en localStorage

Cada juego del carrito tiene cantidad precio y total

Se pueden anadir juegos desde el catalogo y eliminarlos desde el carrito

No hay pagos reales

## panel admin

El panel admin solo se muestra si el usuario actual tiene `is_admin = 1`

Desde ese panel se pueden ver crear editar y borrar juegos

Tambien se pueden ver editar y borrar usuarios

Todo sigue siendo local y mock

## API y base de datos

La API en PHP y la base de datos MySQL todavia no estan conectadas al frontend

En esta fase el objetivo es tener clara la parte visual y el funcionamiento basico

Despues se podran cambiar los datos mock por datos reales desde PHP y MySQL

## comandos

Levantar el proyecto con Docker

```bash
docker compose up --build
```

Levantarlo en segundo plano

```bash
docker compose up -d --build
```

Parar los contenedores

```bash
docker compose down
```

## urls

Home

```text
http://localhost:3000
```

Catalogo

```text
http://localhost:3000/games
```

Login

```text
http://localhost:3000/login
```

Registro

```text
http://localhost:3000/register
```

Carrito

```text
http://localhost:3000/cart
```

Admin

```text
http://localhost:3000/admin
```

## usuarios de prueba

Admin

```text
email admin@gamesvue.com
password admin123
```

Usuario normal

```text
email user@gamesvue.com
password user123
```
