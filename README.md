# Gestión de Tareas - eureky

Aplicación web moderna para la gestión de tareas y listas personales.

## 🚀 Características

- ✅ Crear y gestionar listas personalizadas
- ✅ Agregar tareas a las listas
- ✅ Marcar tareas como completadas
- ✅ Organizar tareas por prioridad
- ✅ Interfaz moderna y fácil de usar
- ✅ Calendario integrado

## 📋 Requisitos Previos

Antes de comenzar, necesitas tener instalado:

1. **Docker Desktop** - Descárgalo desde: https://www.docker.com/products/docker-desktop/

   - Windows: Descarga e instala Docker Desktop para Windows
   - Mac: Descarga e instala Docker Desktop para Mac
   - Linux: Sigue las instrucciones de instalación para tu distribución

2. **Node.js y npm** (necesario para ejecutar los scripts) - Descárgalo desde: https://nodejs.org/
   - Descarga la versión LTS (Long Term Support)
   - La instalación incluye npm automáticamente

## 🔧 Instalación y Ejecución

### Paso 1: Instalar Docker

1. Ve a https://www.docker.com/products/docker-desktop/
2. Descarga Docker Desktop para tu sistema operativo
3. Instala Docker Desktop siguiendo el asistente de instalación
4. Abre Docker Desktop y espera a que se inicie completamente (verás el ícono de Docker en la barra de tareas)

### Paso 2: Obtener el Proyecto

**Opción A: Si tienes el código en una carpeta local**

- Navega a la carpeta del proyecto en tu terminal o explorador de archivos

**Opción B: Si necesitas clonar desde un repositorio**

```bash
git clone <url-del-repositorio>
cd "Gestion De Tareas"
```

### Paso 3: Iniciar la Aplicación

1. Abre una terminal en la carpeta del proyecto:

   - **Windows:** Click derecho en la carpeta → "Abrir en Terminal" o "Abrir en PowerShell"
   - **Mac/Linux:** Abre Terminal y navega a la carpeta con `cd "ruta/a/la/carpeta"`

2. Ejecuta el siguiente comando para iniciar todos los servicios:

```bash
npm run start
```

Este comando iniciará:

- El servidor backend (API) en el puerto 3000
- El servidor frontend (interfaz web) en el puerto 5173
- La base de datos SQLite

**Nota:** La primera vez puede tardar 3-5 minutos mientras Docker descarga e instala las dependencias necesarias. Verás mensajes en la terminal indicando el progreso.

### Paso 4: Configurar la Base de Datos

Espera unos segundos a que los contenedores terminen de iniciar (verás mensajes en la terminal). Luego, en la misma terminal, ejecuta este comando para crear las tablas en la base de datos:

```bash
npm run db:push
```

Deberías ver un mensaje indicando que las tablas se crearon correctamente.

### Paso 5: Acceder a la Aplicación

Abre tu navegador web y visita:

- **Aplicación Frontend:** http://localhost:5173
- **API Backend:** http://localhost:3000

¡Listo! Ya puedes usar la aplicación.

## 🛑 Detener la Aplicación

Para detener todos los servicios y liberar los recursos, ejecuta en la terminal:

```bash
npm run stop
```

Esto detendrá todos los contenedores Docker. Los datos de la base de datos se conservan.

## 📊 Ver Logs

Si necesitas ver qué está pasando en los servicios o diagnosticar algún problema, puedes ver los logs en tiempo real con:

```bash
npm run logs
```

Presiona `Ctrl + C` para salir de los logs.

## 🔍 Verificar que Todo Funciona

1. **Verifica que Docker está corriendo:**

   - Deberías ver el ícono de Docker en la barra de tareas
   - Puedes abrir Docker Desktop para ver los contenedores activos

2. **Verifica que los servicios están activos:**

   - Abre http://localhost:5173 en tu navegador
   - Deberías ver la interfaz de la aplicación

3. **Verifica la API:**
   - Abre http://localhost:3000/health en tu navegador
   - Deberías ver un mensaje JSON con `"status": "healthy"`

## 🆘 Solución de Problemas

### Error: "Docker no está corriendo"

- Asegúrate de que Docker Desktop esté abierto y funcionando
- Espera a que Docker termine de iniciar completamente

### Error: "Puerto ya en uso"

- Si el puerto 3000 o 5173 ya está en uso, cierra la aplicación que lo está usando
- O modifica los puertos en el archivo `docker-compose.yml`

### Error: "npm: command not found" o "npm no se reconoce como comando"

- Asegúrate de tener Node.js instalado: https://nodejs.org/
- Descarga la versión LTS e instálala
- **Importante:** Reinicia tu terminal después de instalar Node.js
- Verifica la instalación ejecutando: `node --version` y `npm --version`

### Los contenedores no inician

- Ejecuta `npm stop` para limpiar contenedores anteriores
- Luego ejecuta `npm run start` nuevamente

### La base de datos no funciona

- Asegúrate de haber ejecutado `npm run db:push` después de iniciar los contenedores
- Verifica que el contenedor del backend esté corriendo

## 📝 Comandos Útiles

### Desarrollo

```bash
# Iniciar la aplicación en modo desarrollo
npm run start

# Detener la aplicación
npm run stop

# Ver logs en tiempo real
npm run logs

# Crear/actualizar tablas de base de datos
npm run db:push

# Generar migraciones de base de datos
npm run db:generate
```

### Producción

```bash
# Construir las imágenes de producción
npm run build:prod

# Iniciar la aplicación en modo producción
npm run start:prod

# Detener la aplicación de producción
npm run stop:prod

# Ver logs de producción
npm run logs:prod
```

## 🏗️ Estructura del Proyecto

```
Gestion De Tareas/
├── backend/                    # Servidor API (Express + TypeScript)
│   ├── Dockerfile              # Dockerfile para desarrollo
│   ├── Dockerfile.prod         # Dockerfile para producción
│   └── src/                    # Código fuente del backend
├── frontend/                   # Interfaz web (React + TypeScript)
│   ├── Dockerfile              # Dockerfile para desarrollo
│   ├── Dockerfile.prod         # Dockerfile para producción
│   ├── nginx.conf              # Configuración de nginx para producción
│   └── src/                    # Código fuente del frontend
├── docker-compose.yml          # Configuración de Docker para desarrollo
├── docker-compose.prod.yml     # Configuración de Docker para producción
└── package.json                # Scripts del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Express, TypeScript, SQLite
- **Base de Datos:** SQLite con Drizzle ORM
- **Contenedores:** Docker y Docker Compose
- **Servidor Web (Producción):** Nginx

## 🚀 Despliegue en Producción

### Diferencias entre Desarrollo y Producción

**Modo Desarrollo:**
- Hot reload activado (cambios se reflejan automáticamente)
- Código fuente montado como volúmenes
- Servidor de desarrollo de Vite en puerto 5173
- Variables de entorno de desarrollo

**Modo Producción:**
- Código compilado y optimizado dentro de las imágenes Docker
- Frontend servido por nginx en puerto 80
- Backend compilado con TypeScript
- Imágenes multi-stage para reducir tamaño
- Sin volúmenes de código fuente
- Configuración de logging y restart policies optimizadas

### Pasos para Desplegar en Producción

1. **Construir las imágenes de producción:**
   ```bash
   npm run build:prod
   ```

2. **Iniciar los servicios:**
   ```bash
   npm run start:prod
   ```

3. **Configurar la base de datos:**
   ```bash
   docker-compose -f docker-compose.prod.yml exec backend npm run db:push
   ```

4. **Acceder a la aplicación:**
   - Frontend: http://localhost (puerto 80)
   - Backend API: http://localhost:3000

### Configuración de Variables de Entorno en Producción

Si necesitas cambiar la URL de la API del frontend, edita el archivo `docker-compose.prod.yml` y modifica el argumento `VITE_API_URL` en la sección del frontend:

```yaml
frontend:
  build:
    args:
      - VITE_API_URL=http://tu-servidor-backend:3000
```

Luego reconstruye las imágenes:
```bash
npm run build:prod
```

### Persistencia de Base de Datos en Producción

Por defecto, la base de datos se guarda dentro del contenedor. Para persistir los datos en el host, agrega un volumen en `docker-compose.prod.yml`:

```yaml
backend:
  volumes:
    - ./backend/database.db:/app/database.db
```

## 📝 Notas para Desarrolladores

Si necesitas trabajar en el código:

- El código del frontend está en `frontend/src/`
- El código del backend está en `backend/src/`
- Los cambios en el código se reflejan automáticamente gracias al hot reload (solo en desarrollo)
- La base de datos se guarda en `backend/database.db`
- Para instalar dependencias manualmente: `npm run install-dependencies`
- Usa `docker-compose.yml` para desarrollo y `docker-compose.prod.yml` para producción

## 👤 Autor

Michael Alava

## 📄 Licencia

ISC
