# desarrollo de GamesVue

## que hay en el proyecto

GamesVue es una mini tienda de videojuegos hecha para el proyecto final

Ahora mismo el proyecto tiene la estructura con Docker y la primera version visual del frontend

El frontend tiene home login registro catalogo carrito y panel admin

Todo el frontend funciona con datos mock guardados en localStorage

No hay conexion real con PHP ni con MySQL en esta parte

## Docker

He usado Docker porque es lo que he trabajado en el ciclo y ayuda a levantar el proyecto siempre de la misma forma

Asi no depende tanto de lo que tenga instalado cada ordenador

El proyecto tiene contenedores para Nuxt PHP MySQL y phpMyAdmin

## partes del proyecto

```text
frontend/
api/
database/
docker/
docs/
docker-compose.yml
```

Cada carpeta tiene una funcion

- `frontend/` contiene la app Nuxt
- `api/` contiene la API hecha con PHP
- `database/` queda preparada para los archivos SQL
- `docker/` contiene los Dockerfile
- `docs/` contiene la documentacion
- `docker-compose.yml` levanta y conecta los servicios

## Nuxt

Nuxt es el framework usado para crear el frontend

Esta basado en Vue y ayuda a ordenar el proyecto por paginas y componentes

Una pagina en Nuxt es un archivo dentro de `pages`

Por ejemplo `pages/games.vue` crea la ruta `/games`

## Nuxt UI

Nuxt UI se usa para tener botones tarjetas formularios avisos y navegacion ya preparados

Asi puedo centrarme en Vue rutas componentes y datos sin hacer mucho CSS manual

## componentes

Un componente es una parte reutilizable de la interfaz

En GamesVue hay componentes para la barra de navegacion las tarjetas de juegos los formularios y el carrito

Esto hace que las paginas sean mas claras

## datos mock

Los datos mock son datos falsos para probar la aplicacion sin base de datos real

Los juegos estan en `data/mockGames.js`

Los usuarios estan en `data/mockUsers.js`

El carrito y el usuario actual se guardan en localStorage

## login

El login compara el email y el password con los usuarios mock

Si coinciden se guarda el usuario actual en localStorage

Hay un usuario normal y un usuario admin

## is_admin

`is_admin = 0` significa usuario normal

`is_admin = 1` significa administrador

El usuario normal puede ver juegos y usar el carrito

El administrador tambien puede entrar al panel admin y gestionar juegos y usuarios

## carrito

El carrito funciona de forma mock

Se pueden anadir juegos desde el catalogo

Se puede ver la cantidad el precio y el total

Tambien se pueden eliminar juegos del carrito

No hay pagos reales

## panel admin

El panel admin solo esta disponible para usuarios con `is_admin = 1`

Desde el panel admin se pueden ver crear editar y borrar juegos

Tambien se pueden ver editar y borrar usuarios

Todo se guarda de forma local

## API y base de datos

PHP y MySQL estan preparados en Docker

La base de datos se inicializa con `database/init/BBDD.sql`

Ese archivo crea las tablas `users`, `games`, `cart_items`, `orders` y `order_items`

Tambien carga usuarios y juegos de prueba parecidos a los datos mock del frontend

La API se abre en el puerto `8080`

MySQL tiene la base de datos `gamesvue`

phpMyAdmin se abre en el puerto `8081`

El frontend todavia usa mocks y no pide datos reales a la API

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

Ver logs

```bash
docker compose logs -f
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

API PHP

```text
http://localhost:8080
```

phpMyAdmin

```text
http://localhost:8081
```

## usuarios de prueba

Admin

```text
email izanbelcam@icloud.com
password 1607
```

Usuario normal

```text
email adrian@gmail.com
password 12345678
```
