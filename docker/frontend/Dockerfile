# Imagen ligera de Node para ejecutar Nuxt.
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor.
WORKDIR /app

# Copia dependencias primero para aprovechar cache.
COPY frontend/package*.json ./

# Instala Nuxt, Vue y Nuxt UI.
RUN npm install

# Copia el resto del frontend.
COPY frontend/ ./

# Puerto interno de Nuxt.
EXPOSE 3000

# Arranca Nuxt aceptando conexiones externas.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
