# Arkadia Game Portal - Frontend

Aplicación web de catálogo de videojuegos construida con **React**, **Vite** y diseño **responsive**. Incluye autenticación (JWT + Google OAuth), exploración de juegos, sistema de reviews y panel de administración.

## Demo
**Live:** https://arkadia-game-portal-project-frontend.vercel.app/

## Configuración Rápida

### 1. Instalación
```bash
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env.local`:
```env
VITE_API_URL=http://localhost:5005
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Ejecutar
```bash
npm run dev
```
Aplicación corriendo en `http://localhost:5173`

Aplicación corriendo en `http://localhost:5173`

## Características Principales

✅ **Autenticación** - Signup/Login con JWT + Google OAuth  
✅ **Catálogo de Juegos** - Navegación y filtrado por plataforma  
✅ **Sistema de Reviews** - Crear, editar y eliminar reseñas (1-5 estrellas)  
✅ **Panel Admin** - CRUD de juegos y gestión de usuarios  
✅ **Perfil de Usuario** - Historial de reviews y juegos favoritos  
✅ **Diseño Responsive** - Optimizado para móviles y tablets  

## Tecnologías

- **React 19** + **Vite** - Framework y build tool
- **React Router 7** - Navegación
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado
- **Google OAuth** - Autenticación social
- **CSS personalizado** - Tema cyberpunk/neon

## Estructura del Proyecto
```
frontend/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Páginas principales
│   ├── services/        # Llamadas API (Axios)
│   ├── context/         # AuthContext
│   ├── CSS/             # Estilos por componente
│   └── App.jsx          # Rutas principales
├── public/
└── .env.local           # Variables de entorno
```

## Scripts Disponibles

- `npm run dev` - Servidor desarrollo con hot reload
- `npm run build` - Build optimizado para producción
- `npm run preview` - Preview del build de producción

---

Desarrollado como proyecto del Bootcamp Ironhack
