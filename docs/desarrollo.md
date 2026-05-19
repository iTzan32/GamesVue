# Desarrollo de GamesVue

## Qué es GamesVue

GamesVue es un proyecto final de curso. La idea es crear una aplicación web
sencilla que funcione como una mini tienda de videojuegos.

En fases posteriores, los usuarios podrán registrarse, iniciar sesión, ver un
catálogo de juegos, añadir juegos al carrito y, si son administradores, crear,
editar o eliminar juegos y usuarios.

En esta primera fase no se desarrolla todavía la tienda completa. Solo se deja
preparada la estructura del proyecto y el entorno de trabajo con Docker.

## Por qué se usa Docker

Docker se usa para que el proyecto se pueda ejecutar siempre de la misma forma,
sin depender demasiado de lo que tenga instalado cada ordenador.

Por ejemplo, el proyecto necesita Node para Nuxt, PHP con Apache para la API,
MySQL para la base de datos y phpMyAdmin para gestionar la base de datos desde
el navegador. Con Docker, cada parte se ejecuta en su propio entorno preparado.

Esto ayuda a evitar problemas como:

- Tener una versión distinta de PHP.
- No tener MySQL instalado.
- Configurar Apache manualmente.
- Tener errores porque en un ordenador funciona y en otro no.

## Qué es un contenedor

Un contenedor es como un entorno pequeño y aislado donde se ejecuta una parte de
la aplicación.

No es una máquina virtual completa. Es más ligero. Cada contenedor tiene lo
necesario para ejecutar su servicio.

En GamesVue hay un contenedor para el frontend, otro para la API, otro para la
base de datos y otro para phpMyAdmin.

## Partes del proyecto

La estructura inicial del proyecto es esta:

```text
frontend/
api/
database/
docker/
docs/
docker-compose.yml
```

Cada carpeta tiene una responsabilidad:

- `frontend/`: contiene la aplicación Nuxt.
- `api/`: contiene la API hecha con PHP.
- `database/`: queda preparada para futuros archivos SQL de la base de datos.
- `docker/`: contiene los Dockerfile necesarios para construir los contenedores.
- `docs/`: contiene documentacion del desarrollo.
- `docker-compose.yml`: define y conecta todos los servicios del proyecto.

## Contenedor de Nuxt

El contenedor de Nuxt ejecuta el frontend de GamesVue.

Nuxt es el framework que se usará para construir la parte visual de la
aplicación. En esta fase solo se prepara el proyecto base, sin crear todavía las
pantallas completas de la tienda.

Este contenedor se abre en el puerto `3000`.

URL:

```text
http://localhost:3000
```

## Contenedor de PHP

El contenedor de PHP ejecuta Apache y sirve la API del proyecto.

La API será la parte encargada de comunicarse con la base de datos. Más adelante
recibirá peticiones del frontend, por ejemplo para obtener juegos, crear
usuarios o gestionar el carrito.

En esta fase la API solo queda preparada. También se deja configurado PDO, que
es la forma que usará PHP para conectarse a MySQL de manera ordenada.

Este contenedor se abre en el puerto `8080`.

URL:

```text
http://localhost:8080
```

## Contenedor de MySQL

El contenedor de MySQL contiene la base de datos del proyecto.

La base de datos se llama:

```text
gamesvue
```

Todavía no se crea la base de datos completa con todas sus tablas. En fases
posteriores se añadirán las tablas de usuarios, juegos, carrito y pedidos si
hacen falta.

## Contenedor de phpMyAdmin

phpMyAdmin es una herramienta web para gestionar MySQL desde el navegador.

Sirve para ver la base de datos, crear tablas, revisar registros y comprobar que
la conexion con MySQL funciona.

Este contenedor se abre en el puerto `8081`.

URL:

```text
http://localhost:8081
```

## Por qué se separan frontend, API y base de datos

El proyecto se separa en varias partes para que sea más fácil de entender,
mantener y explicar.

El frontend se encarga de lo que ve el usuario. La API se encarga de la lógica y
de responder a las peticiones. La base de datos se encarga de guardar la
informacion.

Separarlo así tiene varias ventajas:

- Cada parte tiene una responsabilidad clara.
- Es más fácil encontrar errores.
- Se puede trabajar en el frontend sin tocar la base de datos.
- Se puede cambiar la API sin rehacer toda la parte visual.
- La explicación del proyecto queda más ordenada.

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
