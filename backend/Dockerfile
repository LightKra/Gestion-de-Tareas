# Dockerfile para el backend
FROM node:20-alpine

# Instalar herramientas de compilación necesarias para better-sqlite3
RUN apk add --no-cache python3 make g++ sqlite-libs

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para desarrollo con hot reload
# Para producción, descomenta las siguientes líneas y comenta esta:
# RUN npm run build
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]

