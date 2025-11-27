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

1. **Node.js y npm** - Descárgalo desde: https://nodejs.org/
   - Descarga la versión LTS (Long Term Support)
   - La instalación incluye npm automáticamente
   - Verifica la instalación ejecutando: `node --version` y `npm --version`

## 🔧 Instalación y Ejecución

### Paso 1: Obtener el Proyecto

**Opción A: Si tienes el código en una carpeta local**

- Navega a la carpeta del proyecto en tu terminal o explorador de archivos

**Opción B: Si necesitas clonar desde un repositorio**

```bash
git clone <url-del-repositorio>
cd "Gestion De Tareas"
```

### Paso 2: Instalar Dependencias

Instala las dependencias de ambos proyectos (backend y frontend):

```bash
npm run install
```

O instálalas por separado:

```bash
# Backend
npm run install:backend

# Frontend
npm run install:frontend
```

### Paso 3: Configurar Variables de Entorno

Crea los archivos `.env` en cada proyecto basándote en los archivos `.env.example`:

**Backend:**
```bash
cd backend
copy .env.example .env
```

Edita `backend/.env` y ajusta las variables si es necesario:
```env
PORT=3000
NODE_ENV=development
```

**Frontend:**
```bash
cd frontend
copy .env.example .env
```

Edita `frontend/.env` y ajusta la URL del API si es necesario:
```env
VITE_API_URL=http://localhost:3000
```

### Paso 4: Configurar la Base de Datos

Desde la raíz del proyecto, ejecuta:

```bash
npm run db:push
```

Esto creará las tablas necesarias en la base de datos SQLite.

### Paso 5: Iniciar la Aplicación

Tienes dos opciones:

**Opción A: Ejecutar ambos servicios en paralelo (requiere `concurrently`)**

```bash
npm run dev
```

**Opción B: Ejecutar cada servicio en una terminal separada**

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev:frontend
```

### Paso 6: Acceder a la Aplicación

Abre tu navegador web y visita:

- **Aplicación Frontend:** http://localhost:5173
- **API Backend:** http://localhost:3000
- **Health Check:** http://localhost:3000/health

¡Listo! Ya puedes usar la aplicación.

## 🛑 Detener la Aplicación

Para detener los servicios, presiona `Ctrl + C` en las terminales donde están corriendo.

## 📝 Comandos Útiles

### Instalación

```bash
# Instalar todas las dependencias
npm run install

# Instalar solo backend
npm run install:backend

# Instalar solo frontend
npm run install:frontend
```

### Desarrollo

```bash
# Ejecutar ambos servicios en paralelo (requiere concurrently)
npm run dev

# Ejecutar solo backend
npm run dev:backend

# Ejecutar solo frontend
npm run dev:frontend
```

### Producción

```bash
# Construir ambos proyectos
npm run build

# Construir solo backend
npm run build:backend

# Construir solo frontend
npm run build:frontend

# Iniciar backend en producción
npm run start:backend

# Iniciar frontend en producción (preview del build)
npm run start:frontend
```

### Base de Datos

```bash
# Crear/actualizar tablas de base de datos
npm run db:push

# Generar migraciones de base de datos
npm run db:generate

# Abrir interfaz visual de la base de datos (Drizzle Studio)
npm run db:studio
```

## 🏗️ Estructura del Proyecto

```
Gestion De Tareas/
├── backend/                    # Servidor API (Express + TypeScript)
│   ├── .env.example            # Ejemplo de variables de entorno
│   ├── src/                    # Código fuente del backend
│   ├── dist/                   # Código compilado (generado)
│   ├── database.db             # Base de datos SQLite
│   └── package.json
├── frontend/                   # Interfaz web (React + TypeScript)
│   ├── .env.example            # Ejemplo de variables de entorno
│   ├── src/                    # Código fuente del frontend
│   ├── dist/                   # Build de producción (generado)
│   └── package.json
└── package.json                # Scripts del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Express, TypeScript, SQLite
- **Base de Datos:** SQLite con Drizzle ORM

## 🆘 Solución de Problemas

### Error: "npm: command not found" o "npm no se reconoce como comando"

- Asegúrate de tener Node.js instalado: https://nodejs.org/
- Descarga la versión LTS e instálala
- **Importante:** Reinicia tu terminal después de instalar Node.js
- Verifica la instalación ejecutando: `node --version` y `npm --version`

### Error: "Puerto ya en uso"

- Si el puerto 3000 o 5173 ya está en uso, cierra la aplicación que lo está usando
- O modifica el puerto en los archivos `.env` correspondientes

### La base de datos no funciona

- Asegúrate de haber ejecutado `npm run db:push` después de instalar las dependencias
- Verifica que el servidor backend esté corriendo
- Verifica que el archivo `backend/database.db` exista

### Error al ejecutar `npm run dev`

Si obtienes un error sobre `concurrently` no encontrado, instálalo globalmente:

```bash
npm install -g concurrently
```

O ejecuta los servicios por separado en terminales diferentes.

### Los cambios no se reflejan

- En desarrollo, el hot reload debería funcionar automáticamente
- Si no funciona, reinicia los servidores
- Asegúrate de estar ejecutando en modo desarrollo (`npm run dev`)

## 📝 Notas para Desarrolladores

- El código del frontend está en `frontend/src/`
- El código del backend está en `backend/src/`
- Los cambios en el código se reflejan automáticamente gracias al hot reload (en modo desarrollo)
- La base de datos se guarda en `backend/database.db`
- Las variables de entorno se configuran en los archivos `.env` de cada proyecto

## 👤 Autor

Michael Alava

## 📄 Licencia

ISC
