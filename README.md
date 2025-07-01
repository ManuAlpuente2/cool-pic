# Cool Pic - Aplicación de Filtros Fotográficos

Una aplicación React para aplicar filtros artísticos a tus fotos, con autenticación de Google, y una interfaz intuitiva y responsive.

## 🚀 Funcionalidades Clave

### Autenticación y Usuario
- **Autenticación OAuth**: Google Sign-In
- **Gestión de sesiones**: Persistencia de datos de usuario
- **Rutas protegidas**: Acceso controlado a funcionalidades
- **Perfil de usuario**: Gestión de datos personales

### Filtros y Procesamiento
- **Catálogo de filtros**: 15+ estilos artísticos disponibles
- **Procesamiento en tiempo real**: Generación de imágenes con IA

### Galería y Gestión
- **Galería personal**: Historial de imágenes generadas
- **Descarga de resultados**: Imágenes procesadas listas para usar

### Experiencia de Usuario
- **Diseño responsive**: Mobile-first con soporte para desktop
- **Interfaz intuitiva**: Navegación fluida y accesible. Se puede hacer todo desde cualquier punto de la app
- **Carga progresiva**: Skeleton loaders y estados de carga

## 🏗️ Arquitectura

### Stack Tecnológico
- **Frontend**: React 19.1.0 con React Router DOM 7.6.1
- **Estilos**: SASS con variables CSS y metodología BEM
- **Autenticación**: Firebase Auth (Google)
- **Estado**: React Context API
- **UI Components**: Componentes funcionales con hooks
- **Build**: Create React App con SASS

### Estructura del Proyecto
```
src/
├── api/                    # Capa de servicios API
│   ├── images.js          # Endpoints de imágenes
│   ├── filters.js         # Endpoints de filtros
│   └── example.js         # Ejemplos de uso
├── components/            # Componentes reutilizables
│   ├── filters/          # Componentes de filtros
│   ├── Header/           # Componentes de navegación
│   ├── Posts/            # Componentes de posts
│   ├── skeletons/        # Componentes de carga
│   └── UploadModal/      # Modal de subida
├── contexts/             # Contextos de React
│   ├── AuthContext.jsx   # Gestión de autenticación
│   ├── FiltersContext.jsx # Estado de filtros
│   └── UserContext.jsx   # Datos de usuario
├── lib/                  # Configuraciones externas
│   └── firebase.js       # Configuración Firebase
├── pages/                # Páginas principales
│   ├── index.jsx         # Página de inicio
│   ├── login.jsx         # Página de login
│   ├── filter.jsx        # Página de filtros
│   ├── preview.jsx       # Página de previsualización
│   ├── gallery.jsx       # Galería de imágenes
│   └── profile.jsx       # Perfil de usuario
├── styles/               # Estilos globales
│   └── vars.scss         # Variables CSS
└── mocks/                # Datos de prueba
    └── filters.js        # Filtros mock
```

### Patrones de Diseño
- **Context API**: Gestión centralizada del estado
- **Custom Hooks**: Lógica reutilizable
- **RORO Pattern**: Parámetros nombrados en funciones
- **Early Returns**: Manejo de errores al inicio
- **Mobile-First**: Diseño responsive

## 📊 Modelo de Datos

### Usuario (User)
```javascript
{
  uid: string,           // ID único de Firebase
  email: string,         // Email del usuario
  displayName: string,   // Nombre mostrado
  token: string          // Token de autenticación
}
```

### Filtro (Filter/Style)
```javascript
{
  id: number,            // ID único del filtro
  name: string,          // Nombre del filtro
  description: string,   // Descripción del efecto
  thumbnail: string,     // URL de la imagen preview
  isActive: boolean,     // Estado activo/inactivo
  sortOrder: number,     // Orden de visualización
  popularity: number,    // Puntuación de popularidad
  popular: boolean,      // Flag de popularidad
  isNew: boolean,        // Flag de nuevo filtro
  isFeatured: boolean    // Flag de destacado
}
```

### Imagen Generada (Generated Image)
```javascript
{
  id: string,            // ID único de la generación
  originalImage: string, // URL de la imagen original
  processedImage: string, // URL de la imagen procesada
  styleId: number,       // ID del filtro aplicado
  userId: string,        // ID del usuario
  createdAt: Date,       // Fecha de creación
  status: string         // Estado del procesamiento
}
```

### Respuesta de API
```javascript
{
  content: Array,        // Datos principales
  totalElements: number, // Total de elementos
  totalPages: number,    // Total de páginas
  size: number,          // Elementos por página
  number: number         // Página actual
}
```

## 🔌 API Specification

### Autenticación
Todas las peticiones requieren un token Bearer en el header:
```
Authorization: Bearer {token}
```

### Endpoints

#### 1. Obtener Filtros Disponibles
```http
GET /styles
```

**Respuesta:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Comic",
      "description": "Convierte tus fotos en ilustraciones tipo cómic...",
      "previewImage": "https://example.com/preview.jpg",
      "isActive": true,
      "sortOrder": 1,
      "popularity": 95,
      "popular": true,
      "new": false
    }
  ],
  "totalElements": 15,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

#### 2. Generar Imagen con Filtro
```http
POST /images/generate-with-image
Content-Type: multipart/form-data
Authorization: Bearer {token}
```

**Parámetros:**
- `styleId` (number): ID del filtro a aplicar
- `originalImage` (file): Archivo de imagen original

**Respuesta:**
```json
{
  "id": "gen_123456",
  "originalImage": "https://storage.com/original.jpg",
  "processedImage": "https://storage.com/processed.jpg",
  "styleId": 1,
  "status": "completed",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### 3. Obtener Mis Generaciones
```http
GET /images/my-generations?size={size}&page={page}
Authorization: Bearer {token}
```

**Parámetros:**
- `size` (number, opcional): Elementos por página (default: 5)
- `page` (number, opcional): Número de página (default: 0)

**Respuesta:**
```json
{
  "content": [
    {
      "id": "gen_123456",
      "originalImage": "https://storage.com/original.jpg",
      "processedImage": "https://storage.com/processed.jpg",
      "styleId": 1,
      "styleName": "Comic",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalElements": 25,
  "totalPages": 5,
  "size": 5,
  "number": 0
}
```

### Códigos de Error
- `400`: Parámetros inválidos
- `401`: No autorizado (token inválido)
- `403`: Acceso denegado
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

## 🛠️ Configuración y Desarrollo

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn
- Cuenta de Firebase

### Instalación

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd cool-pic
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar Firebase:**
   - Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Authentication con Google
   - Obtener configuración del proyecto

4. **Variables de entorno:**
Crear archivo `.env.local` en la raíz:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

1. **Ejecutar:**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

### Scripts Disponibles
- `npm start`: Servidor de desarrollo
- `npm run build`: Build de producción
- `npm test`: Ejecutar tests
- `npm run deploy`: Desplegar a GitHub Pages

## 🎨 Guías de Estilo

### CSS/SASS
- **Variables CSS**: Definidas en `src/styles/vars.scss`
- **Metodología BEM**: Para nomenclatura de clases
- **Utility First**: Clases utilitarias para estilos comunes
- **Responsive**: Mobile-first con breakpoints progresivos

### JavaScript/React
- **Componentes funcionales**: Con hooks personalizados
- **Early returns**: Manejo de errores al inicio
- **Patrón RORO**: Parámetros nombrados en funciones

### Accesibilidad
- **ARIA labels**: Etiquetas descriptivas
- **Contraste WCAG**: Mínimo 4.5:1 para texto normal

## 🔗 Enlaces Útiles

- [Documentación de React](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [SASS Documentation](https://sass-lang.com/documentation)
- [React Router Documentation](https://reactrouter.com/)
