Dragon Ball Characters App:

Esta es una aplicación desarrollada como prueba técnica para mostrar información de personajes del universo Dragon Ball (alternativamente al universo Marvel) usando React y la API REST oficial Dragon Ball API.

🚀 Demo

Puedes ver la demo online: https://dragonball-app-characters.vercel.app/

📄 Contenido

1. Características principales

2. Tecnologías utilizadas

3. Instalación

4. Ejecución en modo desarrollo

5. Ejecución en modo producción

6. Estructura del proyecto

7. Tests

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

https://github.com/BogdanNecatu/dragonball-app.git
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

🏗️ Estructura del proyecto

src/
├── app/ # Entrypoint principal (App.tsx, Main.tsx)
├── assets/ # Iconos e imágenes
│ ├── icons/
│ └── images/
├── entities/
│ └── characters/ # Tipos de entidades de personajes
├── features/
│ └── characters/
│ ├── api/
│ ├── model/
│ └── utils/
├── pages/ # Páginas principales (CharacterDetail, Favorites, Home)
├── searchCharacter/ # Buscador de personajes
├── shared/
│ ├── api/ # Configuración de Axios
│ ├── hooks/ # Hooks reutilizables
│ ├── styles/ # Estilos globales (globalStyles.css)
│ └── types/ # Tipos globales
├── widgets/
│ ├── CharacterDetailPage/
│ ├── CharacterList/
│ └── Header/
├── setupTests.ts # Configuración de testing

📝 Tests

Testing Library + Vitest + Cypres:

Run e2e test: npm run e2e

Run Unit test: npm run test

Se testean renderizados y funcionalidades básicas (ej: favoritos)

📅 Licencia

Este proyecto se ha desarrollado con fines formativos como parte de una prueba técnica.
