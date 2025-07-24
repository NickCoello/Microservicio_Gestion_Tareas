# Microservicio-Web---Gesti-n-de-Tareas
                                        ---Introducción---
A continuación se podrá mostrar la documentación necesaria para el desarrollo e implementación de un Microservicio Web que nos ayudará a guardar la gestión de tareas, ya sea diarias del hogar o de un negocio, es un programa sencillo, desarrollado mediante Visual Studio Code. Ambos servicios fueron construidos empleando Node.js junto con el framework Express. Además, se implementó una interfaz web en Angular, la cual se encarga de consumir dichos servicios mediante el uso de HttpClient, permitiendo la interacción dinámica entre el cliente y el servidor.

# Sistema de Gestión de Tareas 🗂️

Aplicación web basada en microservicios con Angular + Node.js

##  Tecnologías
- Backend: Node.js + Express
- Frontend: Angular 15+
- Persistencia: Archivos JSON
- Comunicación: HTTP REST

## 📁 Estructura

/microservicios-online/
│
├── frontend/ # Proyecto Angular
│ └── src/app/
│ ├── componentes/
│ └── servicios/
│
├── tareas-service/ # Microservicio de tareas
│ └── index.js
│
├── usuarios-service/ # Microservicio de usuarios
│ └── index.js
│
└── README.md

##  Instrucciones

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/microservicios-online.git
cd microservicios-online

### 2. Abre terminal en cada microservicio y ejecuta:

npm install
node index.js

Ambos servicios escuchan por defecto en distintos puertos (ej. http://localhost:3000 y http://localhost:3001).

### 3. En el frontend:

npm install
ng serve

### 4. Visita `http://localhost:4200`


## Funcionalidades
📋 Crear tareas con título, descripción y usuario asignado

👥 Seleccionar usuarios desde una lista desplegable

✅ Marcar tareas como completadas

🔄 Actualizar y eliminar tareas

🔍 Mostrar el nombre del usuario asignado a cada tarea


