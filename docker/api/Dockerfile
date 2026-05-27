# Imagen con PHP y Apache para servir la API.
FROM php:8.3-apache

# Instala PDO para conectar PHP con MySQL.
RUN docker-php-ext-install pdo pdo_mysql

# Copia el codigo de la API al servidor web.
COPY api/ /var/www/html/

# Puerto interno de Apache.
EXPOSE 80
