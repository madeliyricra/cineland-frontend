# CineLand

Este proyecto es una aplicación web que utiliza un frontend desarrollado con **React**, **TypeScript**, y **Vite**, un backend construido con **Node.js**, y una base de datos en **Firebase**. Este stack proporciona una arquitectura moderna, rápida y escalable.

![image](https://github.com/user-attachments/assets/24c6c4f9-47f6-4ac0-860f-8600fa513413)

## Tecnologías utilizadas

### Frontend
- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Vite**: Herramienta de desarrollo rápida con soporte para HMR (Hot Module Replacement).
- **ESLint**: Configurado para mantener un código limpio y consistente.

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework minimalista para construir APIs RESTful.

### Base de datos
- **Firebase**: Plataforma de backend como servicio (BaaS) utilizada para autenticación, almacenamiento de datos en tiempo real y hosting.

![image](https://github.com/user-attachments/assets/385bc587-0e38-4369-b46d-0971a6babca1)


## Configuración del proyecto

### Requisitos previos
Asegúrate de tener instalados:
- **Node.js** (v16 o superior)
- **npm** o **yarn**
- Una cuenta de Firebase configurada

### Instalación

   ```bash
   git clone https://github.com/madeliyricra/cineland-frontend.git
   cd cineland-frontend
   npm i
   npm run dev
   ```

### Variables de Entorno

A continuación se describen las variables de entorno necesarias para ejecutar el proyecto:

| Variable      | Descripción                                       | Ejemplo                          |
|---------------|---------------------------------------------------|----------------------------------|
| `VITE_API`    | URL base del backend para las peticiones HTTP     | `https://api.mi-backend.com`    |

#### Uso

Debes agregar estas variables en un archivo `.env` en la raíz del proyecto:

