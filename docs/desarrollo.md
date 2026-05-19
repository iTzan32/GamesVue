# Desarrollo de GamesVue

## En que consiste el proyecto

Pues la idea es crear una aplicación web sencilla que funcione como una mini tienda de videojuegos.

Los usuarios podrán registrarse, iniciar sesión, ver un
catálogo de juegos, añadir juegos al carrito y, si son admin, crear,
editar o eliminar juegos y usuarios.

## Docker

He usado Docker por que es lo que he dado en el ciclo, 
es lo mejor por que asi el proyecto se pueda ejecutar siempre de la misma forma,
sin depender demasiado de lo que tenga instalado cada ordenador.

Por ejemplo, el proyecto necesita Node para Nuxt, PHP con Apache para la API,
MySQL para la base de datos y phpMyAdmin para gestionar la base de datos desde
el navegador y con Docker, cada parte se ejecuta en su propio entorno

## Partes del proyecto

La estructura inicial y en mente que tengo del proyecto de momento es esto:

frontend/
api/
database/
docker/
docs/
docker-compose.yml


Cada carpeta tiene una funcion:

- `frontend/`: contiene la app Nuxt
- `api/`: contiene la API hecha con PHP
- `database/`: queda preparada para futuros archivos SQL de la base de datos y asi que salga todo desplegado donde se ejecute
- `docker/`: contiene los Dockerfile necesarios para construir los contenedores
- `docs/`: contiene la memoria
- `docker-compose.yml`: define y conecta todos los servicios del proyecto

## Contenedor de Nuxt

El contenedor de Nuxt ejecuta el frontend de GamesVue

Nuxt es el framework que voy a usar para contruir el apartado visual ya que viene con un css predeterminado y me puedo centrar mas en VUE API y BBDD

Este contenedor se abre en el puerto `3000`.

URL: http://localhost:3000


## Contenedor de PHP

El contenedor de PHP ejecuta Apache y sirve la API del proyecto

La API será la parte encargada de comunicarse con la base de datos y solicitar los datos para mostrarlos por el front, 
pidiendole datos a la BD para mostrar al usuario
Este contenedor se abre en el puerto `8080`.

URL: http://localhost:8080

## Contenedor de MySQL

El contenedor de MySQL contiene la base de datos del proyecto

La base de datos se llama: gamesvue

## Contenedor de phpMyAdmin

phpMyAdmin es una herramienta web para gestionar MySQL desde el navegador y poder ir metiendo cosas aunque luego estara todo en el sql

Sirve para ver la base de datos, crear tablas, revisar registros y comprobar que
la conexion con MySQL funciona

Este contenedor se abre en el puerto `8081`

URL: http://localhost:8081

## Comandos para levantar el proyecto

Para construir y arrancar todos los contenedores:

```bash
docker compose up --build
```

Para arrancarlos en segundo plano:

```bash
docker compose up -d --build
```

Para parar los contenedores:

```bash
docker compose down
```

Para ver los logs:

```bash
docker compose logs -f
```

## URLs para comprobar que funciona

Frontend Nuxt:

```text
http://localhost:3000
```

API PHP:

```text
http://localhost:8080
```

phpMyAdmin:

```text
http://localhost:8081
```

Datos de conexion de MySQL:

```text
Servidor: db
Base de datos: gamesvue
Usuario: gamesvue_user
Contraseña: gamesvue_password
```

Para entrar como root en phpMyAdmin:

```text
Usuario: root
Contraseña: root_password
```
