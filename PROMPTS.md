# PROMPT 1 (ChatGPT o4-mini)

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


# PROMTP 2 (Claude sonet-3.7)

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
