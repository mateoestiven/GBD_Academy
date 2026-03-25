# GBD Academy - Sistema de Clases Online

## 📚 Descripción

GBD Academy es una plataforma moderna de educación online que permite a profesores dictar clases en vivo con grabación automática y transcripción de audio. Los estudiantes pueden acceder a las clases, participar en tiempo real y revisar el contenido grabado posteriormente.

## ✨ Mejoras Implementadas

### 1. **Diseño Moderno y Profesional**
- Interfaz visual mejorada con gradientes modernos
- Paleta de colores coherente (Púrpura/Azul)
- Animaciones suaves y transiciones elegantes
- Diseño responsive para todos los dispositivos

### 2. **Componentes Optimizados**

#### Navbar
- Navegación mejorada con scroll suave
- Logo con icono personalizado
- Enlaces funcionales a secciones
- Botón de login destacado
- Responsive en dispositivos móviles

#### Hero
- Sección de bienvenida impactante
- Descripción clara del servicio
- Botones de acción (Ver clases, Registrarse)
- Características destacadas con iconos
- Fondo con gradiente atractivo

#### Clases
- Grid responsive de clases disponibles
- Información detallada de cada clase
- Badges de estado
- Horarios de clases
- Efectos hover mejorados

#### Cómo Funciona
- Proceso de 4 pasos claramente explicado
- Iconos visuales para cada paso
- Tarjetas con animaciones
- Explicación detallada de cada etapa

#### Beneficios
- 6 beneficios principales destacados
- Iconos representativos
- Diseño en grid responsive
- Efectos hover interactivos

#### Footer
- Información de contacto
- Enlaces rápidos
- Redes sociales
- Año dinámico actualizado automáticamente

### 3. **Sistema de Autenticación**

#### Login
- Validación de correo y contraseña
- Mensajes de error claros
- Botón para mostrar/ocultar contraseña
- Enlace a recuperación de contraseña
- Enlace a registro de nuevos usuarios
- Simulación de autenticación con localStorage
- Animaciones de carga

#### Signup (Nuevo)
- Formulario de registro completo
- Validación en tiempo real
- Selección de tipo de usuario (Estudiante/Profesor)
- Confirmación de contraseña
- Aceptación de términos y condiciones
- Diseño consistente con Login
- Simulación de registro con localStorage

### 4. **Mejoras Técnicas**

#### Estructura de Carpetas
```
src/
├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx (NUEVO)
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Clases.jsx
│   ├── Comofunciona.jsx
│   ├── Beneficios.jsx
│   └── Footer.jsx
├── styles/
│   ├── Navbar.css (NUEVO)
│   ├── Hero.css (NUEVO)
│   ├── Clases.css (NUEVO)
│   ├── Comofunciona.css (NUEVO)
│   ├── Beneficios.css (NUEVO)
│   ├── Footer.css (NUEVO)
│   ├── Login.css (MEJORADO)
│   └── Signup.css (NUEVO)
├── App.jsx (ACTUALIZADO)
├── App.css (MEJORADO)
├── index.css (MEJORADO)
└── main.jsx
```

#### Validaciones
- Validación de email
- Validación de contraseña (mínimo 6 caracteres)
- Validación de campos requeridos
- Confirmación de contraseña
- Mensajes de error descriptivos

#### Funcionalidades
- Scroll suave a secciones
- Almacenamiento de datos con localStorage
- Redirección después de login/signup
- Mostrar/ocultar contraseña
- Estados de carga en formularios

### 5. **Estilos CSS Modernos**
- Variables CSS para colores y sombras
- Gradientes lineales atractivos
- Efectos hover y transiciones
- Media queries para responsive design
- Animaciones keyframes
- Flexbox y Grid layout

## 🚀 Características Principales

- ✅ Página de inicio atractiva
- ✅ Sistema de login con validaciones
- ✅ Sistema de registro de usuarios
- ✅ Catálogo de clases disponibles
- ✅ Información sobre cómo funciona
- ✅ Beneficios del sistema
- ✅ Footer con información de contacto
- ✅ Diseño responsive
- ✅ Navegación suave
- ✅ Autenticación simulada

## 📦 Dependencias

```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.13.1"
  }
}
```

## 🎨 Paleta de Colores

- **Primario**: #667eea (Azul Púrpura)
- **Primario Oscuro**: #764ba2 (Púrpura)
- **Texto Oscuro**: #333
- **Texto Claro**: #666
- **Borde**: #e0e0e0
- **Fondo Claro**: #f8f9fa
- **Error**: #e74c3c
- **Éxito**: #27ae60

## 🔧 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Responsive Design

El proyecto es completamente responsive y se adapta a:
- 📱 Móviles (320px - 480px)
- 📱 Tablets (481px - 768px)
- 💻 Desktops (769px+)

## 🔐 Autenticación

Actualmente utiliza localStorage para simular autenticación. Para producción, se debe conectar con un backend real:

```javascript
// Datos almacenados en localStorage
localStorage.setItem("userEmail", email);
localStorage.setItem("userName", nombre);
localStorage.setItem("userType", tipo);
localStorage.setItem("isLoggedIn", "true");
```

## 📝 Próximas Mejoras Sugeridas

1. Integración con backend real (Node.js, Python, etc.)
2. Base de datos para almacenar usuarios y clases
3. Sistema de grabación y transcripción
4. Panel de control para profesores
5. Historial de clases para estudiantes
6. Sistema de notificaciones
7. Chat en vivo durante las clases
8. Certificados de finalización
9. Sistema de calificaciones
10. Integración con servicios de pago

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para GBD Academy

---

**Última actualización**: Marzo 2026
