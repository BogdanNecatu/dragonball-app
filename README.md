Dragon Ball Characters App

Esta es una aplicación desarrollada como prueba técnica para mostrar información de personajes del universo Dragon Ball (alternativamente al universo Marvel) usando React y la API REST oficial Dragon Ball API.

🚀 Demo

Puedes ver la demo online (opcional si se publica): https://dragonball-app.vercel.app

📄 Contenido

Características principales

Tecnologías utilizadas

Instalación

Ejecución en modo desarrollo

Ejecución en modo producción

Estructura del proyecto

Tests

Requisitos cumplidos

Licencia

🚀 Características principales:

Vista principal con listado de personajes (primeros 50)

Buscador en tiempo real por nombre de personaje

Sistema de favoritos persistente entre vistas

Vista de detalle con imagen, descripción y transformaciones (ordenadas por nivel de ki)

Responsive en desktop y mobile (diseños Figma seguidos)

Scroll horizontal interactivo para transformaciones

Persistencia de datos cacheados durante 24h

Linter y formatter configurados

Sin advertencias en consola

Modo desarrollo y producción diferenciados

🧰 Tecnologías utilizadas:

React 18 + Vite

TypeScript

Zustand (gestión de estado)

CSS Modules

Jest + Testing Library

ESLint + Prettier

⚙️ Instalación

# Clona el repositorio

https://github.com/NecatuBogdan/dragonball-app.git
cd dragonball-app

# Instala dependencias

npm install

🔧 Ejecución en modo desarrollo

npm run dev

Esto levantará un servidor en http://localhost:5173.

🚨 Ejecución en modo producción

npm run build
npm run preview

Los assets se sirven minimizados y optimizados.

📁 Estructura del proyecto

/
├── public/
├── src/
│ ├── api/ # Lógica de peticiones HTTP
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Páginas principales
│ ├── store/ # Zustand store
│ ├── styles/ # CSS Modules
│ ├── hooks/ # Custom hooks
│ └── types/ # Tipado TypeScript
├── .eslintrc.cjs
├── .prettierrc
├── README.md
├── tsconfig.json
└── vite.config.ts

📝 Tests

npm run test

Testing Library + Jest

Se testean renderizados y funcionalidades básicas (ej: favoritos)

✅ Requisitos cumplidos

📅 Licencia

Este proyecto se ha desarrollado con fines formativos como parte de una prueba técnica.
