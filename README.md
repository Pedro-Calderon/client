  
## InnovaTube - FrontEnd



 **InnovaTube** es una aplicación web que permite a los usuarios que se registran buscar videos de YouTube, y guardar sus videos favoritos. Este repositorio contiene el frontend de la app, construido con **Next.js** y **Material UI**.


 ##  Funcionalidades

- Registro y login de usuarios
- Autenticación con NextAuth
- Búsqueda de videos vía YouTube Data API
- Sección de favoritos persistente DB
- Diseño responsive y moderno con Material UI V7+
- Protección de rutas con middleware
- Despliegue en Railway


## 🛠 Tecnologías

- [Next.js](https://nextjs.org/)
- [React](https://es.react.dev/)
- [Material UI](https://mui.com/)
- [NextAuth](https://next-auth.js.org/)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [Railway](https://railway.app/) (hosting)


## 📦 Instalación
```bash
# Clona el repositorio
git clone https://github.com/Pedro-Calderon/client.git
cd client

# Instala dependencias
npm install

# Crea un archivo .env.local
cp .env.example .env.local

Completa el .env.local con tus claves, Ejemplo:
NEXT_PUBLIC_YOUTUBE_API_KEY=tu_clave
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto



