# desarrollo de GamesVue

## que hay en el proyecto

GamesVue es una mini tienda de videojuegos hecha para el proyecto final

Ahora mismo el proyecto tiene la estructura con Docker, frontend, API y base de datos

El frontend tiene home login registro catalogo carrito perfil y panel admin

El catalogo, login, registro, perfil y panel admin se comunican con PHP y MySQL

El carrito se mantiene en localStorage hasta finalizar la compra

Al finalizar compra se guarda una compra en MySQL

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

## datos

Los juegos y usuarios se guardan en MySQL

La API PHP lee y escribe en la base de datos usando PDO

El carrito y el usuario actual se guardan en localStorage para simplificar la demo

Cuando se pulsa finalizar compra, la API guarda la compra en `historial_compras`

## login

El login envia el email y el password a la API

La API comprueba el password con `password_verify`

Si coincide se guarda el usuario actual en localStorage

Hay un usuario normal y un usuario admin

Cada usuario tiene nombre, email, direccion y telefono

## is_admin

`is_admin = 0` significa usuario normal

`is_admin = 1` significa administrador

El usuario normal puede ver juegos y usar el carrito

El administrador tambien puede entrar al panel admin y gestionar juegos y usuarios

## carrito

El carrito funciona de forma local

Se pueden anadir juegos desde el catalogo

Se puede ver la cantidad el precio y el total

Tambien se pueden eliminar juegos del carrito

Al cerrar sesion el carrito se vacia

Al finalizar compra se guarda el historial y se descuenta stock

## perfil

Cada usuario puede entrar a su perfil pulsando su nombre en la barra superior

Desde el perfil puede editar su nombre, email, direccion, telefono y password

## panel admin

El panel admin solo esta disponible para usuarios con `is_admin = 1`

Desde el panel admin se pueden ver crear editar y borrar juegos

Tambien se pueden ver editar y borrar usuarios

Los cambios se guardan en MySQL mediante la API

## API y base de datos

PHP y MySQL estan preparados en Docker

La base de datos se inicializa con `database/init/BBDD.sql`

Ese archivo crea las tablas `users`, `games` y `historial_compras`

Tambien carga usuarios y juegos de prueba para la demo

La API se abre en el puerto `8080`

MySQL tiene la base de datos `gamesvue`

phpMyAdmin se abre en el puerto `8081`

El frontend pide datos reales a la API PHP

El archivo `api/index.php` hace de router sencillo

La logica se reparte en `api/usuarios.php`, `api/juegos.php` y `api/admin.php`

Endpoints principales de la API

```text
GET    http://localhost:8080/index.php/games
POST   http://localhost:8080/index.php/games
PUT    http://localhost:8080/index.php/games/{id}
DELETE http://localhost:8080/index.php/games/{id}
POST   http://localhost:8080/index.php/login
POST   http://localhost:8080/index.php/register
GET    http://localhost:8080/index.php/users
PUT    http://localhost:8080/index.php/users/{id}
DELETE http://localhost:8080/index.php/users/{id}
POST   http://localhost:8080/index.php/checkout
```

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
