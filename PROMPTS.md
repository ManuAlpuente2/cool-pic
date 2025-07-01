# PROMPTS

## PROMPT (ChatGPT o4-mini)

Ayúdame a preparar los prompts para programar una aplicación con IA.

La idea es muy sencilla: Una app de filtros de fotografía utilizando la api de chatgpt. El usuario sube una imagen desde la galería o la camára y elige alguno de los filtros disponibles (comic, ilustración, estudio...) cada filtro tiene un prompt preestablecido que se envía junto con la imagen a chatgpt para que el usuario reciba su foto editada.

Cada usuario comienza con 3 tokens, aplicar un filtro a una foto cuesta 1 token y se pueden comprar 10 tokens por 1€ (Estos precios son provisionales)

Necesidades:
- Login con google y apple
- Pasarela de pagos
- Seguridad para no compartir nunca la apikey de chatgpt

Páginas:
- Galería de filtros.
- Detalle de filtro.
- Mi perfil
- Comprar tokens
- Compra exitosa
- Manejo de errores

Galería de filtros
- Muestra una cuadrícula con un thumbnail del filtro, su nombre y un badge para los filtros destacados o nuevos.
- Muestra un buscador de filtros. Al buscar se filtra la galeria.
- Botón de subir foto para filtrar. Al pulsar permite subir una foto desde la galeria y después muestra el listado de filtros para aplicarlo.
- Al pulsar en un filtro vamos al detalle

Detalle de un filtro
- Muestra la vista previa del filtro
- Botón de aplicar a mi foto. Al pulsar podemos subir una foto que se enviará a chatgpt junto con su prompt preestablecido.

Mi perfil
- Muestra los tokens disponibles. Al pulsar vamos a la página de compra
- Muestra un listado con las imágenes generadas por el usuario
- Muestra los datos personales y permite modificarlos, cerrar sesión y eliminar usuario

Comprar tokens
- Muestra los diferentes precios y permite seleccionar uno. Al pulsar se va a la página de pago

Quiero que la web esté realizada en React y quiero usar frameworks o apis para gestionar los pagos, la seguridad y el login.


Aconséjame cómo hacerlo y ayúdame con la idea y los prompts. ¿Crees que sería mejor hacerlo con claude-sonnet o con chatgpt? (tengo usuario de pago en los dos).

¿Preparamos varios prompts para ir haciéndolo poco a poco o seguimos una estrategia one shot y luego vamos iterando? Tú eres la experta, dime


## PROMTP (Claude sonet-3.7)

Eres un asistente experto en desarrollo web con React y Firebase. Quiero montar la primera iteración de mi aplicación de filtros de fotografía, que consiste en:

1. Iniciar un proyecto React (Usa el existente).
2. Configurar Firebase Authentication para permitir login con Google y con Apple.
3. Crear una página de login (`/pages/login.jsx`) que muestre dos botones: “Continuar con Google” y “Continuar con Apple”.
4. Al pulsar cada botón, inicie la autenticación correspondiente y, una vez logueado, redirija al usuario a la página principal (`/pages/index.jsx`).
5. Si el usuario ya está autenticado, hacer que cualquier ruta protegida redirija automáticamente a `/` y mostrar su email en la barra (o simplemente “Bienvenido, <email>”).
6. Guardar la configuración de Firebase en un fichero `lib/firebase.js` (incluyendo inicialización de Firebase Client y la exportación de `auth`).
7. Usar localStorage para almacenar el token en el cliente (guardar el idToken en memoria con React Context).
9. Incluir instrucciones paso a paso: 
   - Qué dependencias instalar (`firebase`, `firebase-admin`, `react`, etc.).
   - Dónde colocar las credenciales de Firebase (archivo `.env.local` con `PUBLIC_FIREBASE_API_KEY`, `PUBLIC_FIREBASE_AUTH_DOMAIN`, etc..
   - Código completo de `lib/firebase.js` (cliente) y `lib/firebaseAdmin.js` (administración en el servidor).
   - Código de la página `/pages/login.jsx` con componentes React, manejadores de evento `onClick` para `signInWithPopup` (Google) y `signInWithPopup` (Apple via OAuth).
   - Código de la página `_app.jsx` o un contexto que mantenga el estado de autenticación y verifique en el cliente si ya hay un usuario.
   - Ejemplo de API route `/pages/api/auth/session.js` que recibe el token, lo verifica y responde con `{ uid, email }` o error 401.

Por favor, genera todos los archivos necesarios (React, componentes, configuración de Firebase) y asegúrate de que al ejecutar `npm run dev` se pueda navegar a `/login` y autenticar con Google o Apple. No es necesario incluir estilos complejos, puede usarse CSS mínimo. Sé lo más concreto posible con el código, incluyendo comentarios donde haga falta.


## PROMTP (Claude sonet-3.7)

He creado un mock de la información que espero recibir en el futuro desde back para mi app de filtros fotográficos.

Quiero que crees un componente <FilterList> que sea un grid de cards (<FilterItem>) en el que se mostrará el thumbnail, el nombre del filtro y badges cuando sean "isFeatured" o "isNew". 

El componente <FilterList> debe mostrarse en la página index.jsx tanto si el usuario está logado como si no


## PROMTP (Claude sonet-3.7)

Muy bien por ahora! Ahora vamos a implementar la funcionalidad del botón "Subir foto".

Cuando haga clic en él debe permitirme subir una foto desde la galería o desde la cámara.

Cuando la foto se cargue me mostrará una nueva página "Preview".

Esta página mostrará:

El <Header/>
La foto que he subido

Si he pulsado en el botón de la home me mostrará:
Título: Selecciona el filtro que quieres aplicar a tu foto
Listado de filtros. (Por ahora no le pongas más funcionalidad)

Si he pulsado desde la página de detalle de un filtro:
Título: Vamos a aplicar el filtro ${nombre} a tu foto.
Texto: Esto consumirá 1 token de tu saldo (tienes 3 tokens)
Botón: "✨ Aplicar filtro"

## PROMTP (Claude sonet-3.7)

Ahora vamos a mejorar un poco los estilos de la app. Quiero un estilo moderno, minimalista y tecnológico.

Quiero que uses la tipografia Inter desde Google Fonts.
Aplica fondo negro.
En las cards quiero que el nombre del filtro esté encima de la imagen con un degradado para que pueda leerse.
Usa colores brillantes para los badges y botones
No uses sombras

## PROMTP (Claude sonet-3.7)

Vamos a implementar una nueva funcionalidad. Repasa bien todos los archivos y modifica lo que sea necesario para hacer una estructura correcta.

Cuando un usuario haga login haz una llamada POST a ${BASE_URL}/auth/oauth2/login con el siguiente body y haz un console.log con la respuesta.

{
    "email": user.email,
     "name": user.displayName,
     "provider": "GOOGLE",
     "providerId": user.uuid
}

## PROMTP (Claude sonet-3.7)

Ahora crea un nuevo UserContext y guarda en él la información del usuario que se reciba en la llamada a  ${BASE_URL}/auth/oauth2/login.

## PROMTP (Claude sonet-3.7)

Quiero que implementes una nueva funcionalidad. La información que recibas de ${BASE_URL}/auth/oauth2/login debe ser persistente. Guárdala en el almacenamiento local

## PROMTP (Claude sonet-3.7)

Vamos a comenzar a usar información real.

Modifica la constante `filters` por información real. Para ello haz una llamada GET a  ${BASE_URL}/styles, la información que te interesa de la respuesta es la siguiente

{ "id": 1,
"name": "Artistic Oil Painting",
"description": "Transform your photo into a beautiful oil painting with rich textures and vibrant colors",
"previewImageUrl": "/images/styles/oil-painting.jpg",
"sortOrder": 1,
"isActive": true,
"popularity": 0, }

## PROMTP (Claude sonet-3.7)

Haz que en la página de detalle de un filtro también se muestre la información real obtenida desde la api. Implementa la funcionalidad de la forma que creas más conveniente

## PROMTP (Claude sonet-3.7)

Al pulsar en el botón "Aplicar filtro" se debe hacer una llamada al endpoint `images/generate` de la api con los siguientes parámetros multipart/form-data

styleId: el id del filter seleccionado
originalImage: la imagen seleccionada (image)

## PROMTP (Claude sonet-3.7)

Aplica un estilo liquid glass (similar al de Apple) a `.upload-button` y a `.filter-item__badge`

## PROMTP (Claude sonet-3.7)

Okey, ahora vas a crear la página "mi perfil" de un usuario logueado.

Esta página mostrará sus datos de inicio de sesión y debajo un grid con sus imágenes generadas.

Estas imágenes se obtienen haciendo una consulta a {{base_url}}/images/my-generations?page=0&size=10

## PROMTP (Claude sonet-3.7)

Transforma el listado de estilos (.filter-list) de la home en un slider sólo cuando el usuario no esté logueado.

Usa Swiper.js y haz un slider tipo carrusel

## PROMTP (Claude sonet-3.7)

Crea una página de "Galeria" para usuarios logados. Se accederá haciendo click en el avatar del header.

En la página se mostrará un grid con todas la imágenes generadas por ese usuario.

Las imágenes se obtienen en el endpoint `/images/my-generations`

## PROMTP (Claude sonet-3.7)

al pulsar en `.upload-button` quiero que se muestre un modal ofreciendo la posibilidad de seleccionar "Galeria" o "Cámara" y que modifique las opciones del input de subida de imágenes para que el usuario de móvil pueda subir imágenes desde la galeria o desde la cámara

Aplica estilos liquid cristal al modal


