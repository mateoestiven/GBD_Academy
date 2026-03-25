# GBD Academy - Instrucciones de Instalación y Ejecución

## Requisitos Previos

- Node.js v16 o superior
- npm o yarn
- MongoDB Atlas (base de datos en la nube)

## Instalación

### 1. Instalar dependencias del Frontend

```bash
npm install
```

### 2. Instalar dependencias del Backend

```bash
cd server
npm install
cd ..
```

## Configuración

### 1. Variables de Entorno - Frontend

El archivo `.env` ya está configurado:
```
VITE_API_URL=http://localhost:5000/api
```

### 2. Variables de Entorno - Backend

El archivo `server/.env` ya contiene:
```
PORT=5000
MONGODB_URI=mongodb+srv://admin:admin123@fraider.wwnevh0.mongodb.net/gbd_academy?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

**IMPORTANTE:** Para producción, cambiar `JWT_SECRET` por una clave segura.

## Ejecución

### Opción 1: Ejecutar Frontend y Backend por separado

**Terminal 1 - Frontend:**
```bash
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```
El backend estará disponible en: `http://localhost:5000`

### Opción 2: Ejecutar ambos simultáneamente

```bash
npm run fullstack
```

## Funcionalidades Implementadas

### 1. Autenticación de Usuarios
- ✅ Registro con validaciones (documento, nombre, teléfono, email, contraseña)
- ✅ Inicio de sesión
- ✅ Tipos de usuario: estudiante, docente, administrador

### 2. Gestión de Cursos (Administrador)
- ✅ Crear cursos
- ✅ Asignar docentes
- ✅ Actualizar información
- ✅ Eliminar cursos

### 3. Gestión de Materias (Administrador)
- ✅ Ofertar materias
- ✅ Asignar docentes
- ✅ Definir horarios y cupos
- ✅ Modificar información
- ✅ Eliminar materias

### 4. Inscripción de Materias (Estudiante)
- ✅ Ver materias disponibles
- ✅ Buscar materias por nombre o código
- ✅ Inscribirse en materias
- ✅ Validación de cupos disponibles

### 5. Horario del Estudiante
- ✅ Ver materias inscritas
- ✅ Visualizar horarios
- ✅ Información del docente

## Estructura del Proyecto

```
GBD_ACADEMY_FINAL/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx (mejorado)
│   │   │   ├── LoginNew.jsx
│   │   │   ├── Signup.jsx (original)
│   │   │   ├── SignupNew.jsx (mejorado)
│   │   │   ├── ClassManagement.jsx
│   │   │   ├── SubjectManagement.jsx (nuevo)
│   │   │   ├── SubjectsView.jsx (nuevo)
│   │   │   └── StudentSchedule.jsx (nuevo)
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Clases.jsx
│   │   ├── Comofunciona.jsx
│   │   ├── Beneficios.jsx
│   │   └── Footer.jsx
│   ├── services/
│   │   └── api.js (nuevo - centraliza peticiones HTTP)
│   ├── styles/
│   └── App.jsx
├── server/
│   ├── models/
│   │   ├── User.js (actualizado)
│   │   ├── Course.js (nuevo)
│   │   ├── Subject.js (nuevo)
│   │   └── Class.js
│   ├── controllers/
│   │   ├── userController.js (actualizado)
│   │   ├── courseController.js (nuevo)
│   │   ├── subjectController.js (nuevo)
│   │   ├── classController.js
│   │   └── materiaController.js
│   ├── routes/
│   │   ├── userRoutes.js (actualizado)
│   │   ├── courseRoutes.js (nuevo)
│   │   ├── subjectRoutes.js (nuevo)
│   │   └── classRoutes.js
│   ├── index.js (actualizado)
│   └── .env (actualizado)
├── .env
└── package.json
```

## Validaciones Implementadas

### Registro de Usuario
- Documento: 11 dígitos, único
- Nombre: máximo 40 caracteres, sin caracteres especiales
- Teléfono: 10 dígitos, único
- Email: formato válido, único
- Contraseña: mínimo 8 caracteres, encriptada

### Ofertar Materia
- Código: 10 dígitos, único
- Nombre: máximo 50 caracteres
- Docente: debe existir y ser de tipo "docente"
- Horario: formato libre
- Cupos: mínimo 1

### Inscripción de Materia
- Validación de cupos disponibles
- Prevención de inscripciones duplicadas
- Actualización automática de cupos

## Endpoints de la API

### Autenticación
- `POST /api/users/signup` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/profile/:id` - Obtener perfil
- `GET /api/users/all/users` - Obtener todos los usuarios
- `GET /api/users/teachers/all` - Obtener docentes

### Materias
- `GET /api/subjects` - Obtener materias disponibles
- `POST /api/subjects` - Crear materia (admin)
- `GET /api/subjects/:id` - Obtener materia por ID
- `GET /api/subjects/buscar/search?q=query` - Buscar materias
- `PUT /api/subjects/:id` - Actualizar materia (admin)
- `POST /api/subjects/:subject_id/enroll` - Inscribir estudiante
- `GET /api/subjects/horario/:estudiante_id` - Obtener horario del estudiante
- `DELETE /api/subjects/:id` - Eliminar materia (admin)

### Cursos
- `GET /api/courses` - Obtener cursos
- `POST /api/courses` - Crear curso (admin)
- `GET /api/courses/:id` - Obtener curso por ID
- `PUT /api/courses/:id` - Actualizar curso (admin)
- `DELETE /api/courses/:id` - Eliminar curso (admin)

## Mejoras Implementadas

1. ✅ Credenciales de MongoDB en variables de entorno
2. ✅ URLs de API centralizadas en servicio
3. ✅ Modelos actualizados con validaciones
4. ✅ Controladores completos con manejo de errores
5. ✅ Rutas registradas correctamente
6. ✅ Componentes React mejorados
7. ✅ Validaciones en frontend y backend
8. ✅ Servicio centralizado de API

## Próximas Mejoras Sugeridas

1. Sistema de transcripción de voz a texto en tiempo real
2. Grabación de clases
3. Chat en vivo durante clases
4. Panel de control para administradores
5. Reportes de asistencia
6. Sistema de calificaciones
7. Notificaciones en tiempo real
8. Autenticación con JWT middleware
9. Roles y permisos más granulares
10. Integración con servicios de pago

## Solución de Problemas

### Error de conexión a MongoDB
- Verificar que la URI en `.env` es correcta
- Verificar que MongoDB Atlas está activo
- Verificar que la IP está en la lista blanca de MongoDB Atlas

### Error de CORS
- Verificar que el backend está corriendo en puerto 5000
- Verificar que CORS está habilitado en `server/index.js`

### Error de módulos no encontrados
- Ejecutar `npm install` en la carpeta raíz y en `server/`
- Limpiar `node_modules` y reinstalar: `rm -rf node_modules && npm install`

## Contacto y Soporte

Para más información o reportar problemas, contactar al equipo de desarrollo.

---

**Última actualización:** Marzo 2026
