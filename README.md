# Proyecto backend y frontend - Web eventos

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Colecciones y rutas](#ColeccionesRutas)
- [Uso](#uso)

## 1.Descripción

Este proyecto es una aplicación de JS en el que está desarrollado tanto el backend como el frontend. Es una web de eventos en la que tenemos 2 tipos de usuarios: usuarios y asistentes.

Los usuarios al registrarse pueden ver los eventos que hay publicados, añadirse como asistente a ellos y crear nuevos eventos.

Los asistentes pueden ver los eventos disponibles y añadirse como asistente a ellos.

Ambos grupos pueden ver los asistentes confirmados que hay en cada evento, así como toda la información del evento. Si finalmente no quieren asistir también pueden eliminarse de la lista de asistentes de un evento concreto. Hay una sección de perfil en el que podrán ver los datos de su perfil, modificarlo o eliminarlo.

Adicional, hay un perfil de administrador con permisos especiales. Puede ver todos los usuarios y asistentes registrados y eliminarlos. Puede acceder a una sección en la que debe validar los eventos creados por los usuarios, ya que una vez que se crean primero se quedan pedientes de validación por el administrador y una vez que este los valida aparecerán publicados en la web.

Si no estás registrado, ni como asistente ni como usuario, solo podrás ver un resumen de la web y las fotografías de los eventos que hay publicados actualmente. Además, de la opción de registrarte.

En el backend tenemos 3 colecciones que se relacionan entre sí: usuarios, asistentes y eventos. Se utiliza Multer para manejar la carga de archivos y Cloudinary para almacenarlos en la nube. Además, cuando un usuario o asistente se loguea se crea un token para poder manejar las autorizaciones a las diferentes secciones de la página. El administrador tiene acceso a acciones y secciones que los demás perfiles no tienen permiso.

## 2.Instalación

Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd tu_repositorio
   ```
3. Instala las dependencias:

   ```bash
   npm install express nodemon mongoose dotenv bcrypt jsonwebtokn multer multer-storage-cloudinary cloudinary cors
   ```

## 3.Configuración

1. Crea una cuenta en cloudinary si aún no tienes una.

2. Obtén tu cloud_name, api_key, y api_secret desde tu panel de control de Cloudinary.

3.Configura estas variables de entorno en tu sistema o archivo .env:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4. Asegúrate de tener una base de datos en MongoDB en funcionamiento.

5. Configura la conexión a MongoDB en tu archivo .env.

6. Define una clave secreta para firmar los tokens JWT. Esta clave debe ser segura y no compartirla públicamente.

7. Agrega esta clave al archivo .env:

## 4.Colecciones y Rutas

En esta sección se describen las diferentes colecciones que tiene el proyecto y sus respectivas rutas de acceso.

### Users

- **Descripción**: Colección que almacena los datos de los usuarios: nombre, email, contraseña y foto de perfil.
- **Rutas**:

  - `/api/v1/users`: (GET) Obtiene todos los usuarios. Solo puede obtener todos los datos un perfil de administrador.
    RES 200 - Muestra todos los usuarios
    RES 400 - Error
  - `/api/v1/users/:id`: (GET) Obtiene un usuario por ID. Un usuario solo puede acceder a su propia información.
    RES 200 - Muestra la información del usuario.
    RES 400 - Error
  - `/api/v1/users/register`: (POST) Registra un nuevo usuario.
    RES 201 - Te has registrado correctamente. Ya puedes iniciar sesión
    RES 400 - Ese nombre de usuario ya existe
    RES 400 - Ese email ya existe
    RES 400 - La contraseña debe tener entre 1 y 8 caracteres, al menos una mayúscula y un número
    RES 400 - Error al registrarse
  - `/api/v1/users/login`: (POST) Inicia sesión de un usuario existente.
    RES 200 - Accede a la página principal de la web
    RES 400 - El email o la contraseña son incorrectos, si el email es incorrecto
    RES 400 - El email o la contraseña son incorrectos, si la contraseña es incorrecta
    RES 400 Error
  - `/api/v1/users/add-event/:id`: (PUT) Añade un evento a la lista de eventos que va a asistir.
    RES 200 - Se añade el evento a la lista de eventos a los que va a asistir y al evento se le añade como asistente
    RES 400 - Error
  - `/api/v1/users/update/:id`: (PUT) Modifica los datos del usuario
    RES 200 - Se modifican los datos del usuario
    RES 400 - Ese nombre de usuario ya existe
    RES 400 - Ese email ya existe
    RES 400 - Error
  - `/api/v1/users/:id`: (DELETE) Elimina un usuario por su ID. El usuario solo puede eliminar su propio perfil.
    RES 200 - Se cierra la sesión y aparece la página principal
    RES 400 - Error
  - `/api/v1/users/admin/:id`: (DELETE) Solo el administrador puede eliminar a otros usuarios.
    RES 200 - Se elimina el usuario
    RES 400 - Error
  - `/api/v1/users/:id/delete/:eventId`: (DELETE) Se elimina un evento de la lista de eventos a los que va a asistir.
    RES 200 - Se eliminar el evento de la lista del usuario y en el propio evento se le elimina como asistente.
    RES 400 - Error

### Attendees

- **Descripción**: Colección que almacena los datos de los asistentes: nombre, email y contraseña.
- **Rutas**:

  - `/api/v1/attendees`: (GET) Obtiene todos los asistentes. Solo puede obtener todos los datos un perfil de administrador.
    RES 200 - Muestra todos los asistentes
    RES 400 - Error
  - `/api/v1/attendees/:id`: (GET) Obtiene un asistente por ID. Un asistente solo puede acceder a su propia información.
    RES 200 - Muestra la información del asistente.
    RES 400 - Error
  - `/api/v1/attendees/register`: (POST) Registra un nuevo asistente.
    RES 201 - Te has registrado correctamente. Ya puedes iniciar sesión
    RES 400 - Ese nombre de asistente ya existe
    RES 400 - Ese email ya existe
    RES 400 - La contraseña debe tener entre 1 y 8 caracteres, al menos una mayúscula y un número
    RES 400 - Error al registrarse
  - `/api/v1/attendees/login`: (POST) Inicia sesión de un asistente existente.
    RES 200 - Accede a la página principal de la web
    RES 400 - El email o la contraseña son incorrectos, si el email es incorrecto
    RES 400 - El email o la contraseña son incorrectos, si la contraseña es incorrecta
    RES 400 Error
  - `/api/v1/attendees/add-event/:id`: (PUT) Añade un evento a la lista de eventos que va a asistir.
    RES 200 - Se añade el evento a la lista de eventos a los que va a asistir y al evento se le añade como asistente
    RES 400 - Error
  - `/api/v1/attendees/update/:id`: (PUT) Modifica los datos del asistente
    RES 200 - Se modifican los datos del asistente
    RES 400 - Ese nombre de usuario ya existe
    RES 400 - Ese email ya existe
    RES 400 - Error
  - `/api/v1/attendees/:id`: (DELETE) Elimina un asistente por su ID. El asistente solo puede eliminar su propio perfil.
    RES 200 - Se cierra la sesión y aparece la página principal
    RES 400 - Error
  - `/api/v1/attendees/admin/:id`: (DELETE) Solo el administrador puede eliminar a otros asistentes.
    RES 200 - Se elimina el asistente
    RES 400 - Error
  - `/api/v1/attendees/:id/delete/:eventId`: (DELETE) Se elimina un evento de la lista de eventos a los que va a asistir.
    RES 200 - Se eliminar el evento de la lista del asistente y en el propio evento se le elimina como asistente.
    RES 400 - Error

### Events

- **Descripción**: Colección que almacena los datos de los eventos. Esta colección está relacionada con la colección usuarios y asistentes.
- **Rutas**:

  - `/api/v1/events/not-verified`: (GET) Obtiene todos los eventos que aún no han sido verificados por el administrador.
    RES 200 - Muestra los eventos no verificados
    RES 400 - Error
  - `/api/v1/events`: (GET) Obtiene todos los eventos verificados.
    RES 200 - Muestra todos los eventos verificados
    RES 400 - Error
  - `/api/v1/events/events/attendees/:id`: (GET) Obtiene todos los asistentes a un evento por ID.
    RES 200 - Muestra todos los asistentes y usuarios que han marcado que asistirán a ese evento
    RES 400 - Error
  - `/api/v1/events/:id`: (GET) Obtiene los datos de un evento por su ID.
    RES 200 - Muestra los datos del evento
    RES 400 - Error
  - `/api/v1/events/:id`: (PUT) Valida un evento para que pueda ser publicado en la página de eventos. Esta acción solo la puede realizar el administrador.
    RES 200 - Valida el evento y lo publica en la página principal.
    RES 400 - Error
  - `/api/v1/events/`: (POST) Publica un evento. Solo puede publicar un usuario registrado.
    RES 201 - Se añade el evento al apartado de eventos no validados
    RES 400 - Error
  - `/api/v1/events/:id`: (DELETE) Elimina los datos de un evento por su ID. Esta acción solo la puede realizar el administrador en el apartado de validación de eventos.s
    RES 200 - Se elimina el evento
    RES 400 - Error

## 5.Uso

**Registro de usuario**
{"img": "Archivo jpg, png, jpeg, gif o webp",
"name": "Nombre",
"email": "Email",
"password": "Contraseña" (Tiene que tener 8 caracteres, al menos un número y una mayúscula),
"rol": "Por defecto siempre será user"
}

**Registro de asistente**
{ "name": "Nombre",
"email": "Email",
"password": "Contraseña" (Tiene que tener 8 caracteres, al menos un número y una mayúscula)}

**Login de usuario**
{"email": "Email",
"password": "Contraseña"}
Los datos para loguearse como asistente de prueba son:
email: usuario@gmail.com
password: User123

**Login de asistente**
{"email": "Email",
"password": "Contraseña"}
Los datos para loguearse como asistente de prueba son:
email: asistente@gmail.com
password: Att12345

**Login de administrador**
Los datos para loguearse como admnistrador son:
email: admin@gmail.com
password: Admin123

**Actualizar datos de usuario**
En la ruta el id será el id del usuario que queremos modificar.
{"Campo a modificar": "Nuevo dato"}

**Actualizar datos de asistente**
En la ruta el id será el id del usuario que queremos modificar.
{"Campo a modificar": "Nuevo dato"}

**Crear evento**
{"img": "Archivo jpg, png, jpeg, gif o webp",
"name": "Nombre del evento",
"date":"Fecha",
"location":"Localización",
"description": "Descripción del evento"
}

**Registro, inicio de sesión, publicación de un evento, actualización del perfil, eliminar perfil eliminar perfil asistir y no asistir a un evento**

1. Registro de usuario y asistente
   El usuario/asistente envía una solicitud POST para registrarse, proporcionando los datos requeridos.
   Si el registro es exitoso, el servidor devuelve un mensaje de confirmación.

2. Inicio de Sesión:
   El usuario/asistente envía una solicitud POST para iniciar sesión, proporcionando email y contraseña.
   Si las credenciales son válidas, el servidor devuelve un token JWT que puede ser utilizado para realizar acciones autenticadas.

3. Publicación de un evento (Solo usuarios):
   Con el token JWT, el usuario envía una solicitud POST para publicar un nuevo evento, proporcionando los detalles del evento. Si la publicación es exitosa, el servidor devuelve un mensaje de confirmación e indica que será revisado para la publicación a la mayor brevedad.

4. Actualización del perfil:
   El usuario/asistente envía una solicitud PUT para modificar los datos que considere.
   Si las credenciales son válidas, se modificarán los datos y se devuelve un mensaje de confirmación.

5. Eliminar perfil:
   El usuario/asistente envía una solicitud DELETE para eliminar el perfil. Si las credenciales son válidas se eliminará el perfil y se cerrará la sesión.

6. Asistir a un evento:
   El usuario/asistente envía una solicitud PUT para añadir el evento a su array events.
   Si las credenciales son válidas, se añadirá el evento al apartado "Mis eventos" y se marcará el icono de confirmación de asistencia a ese evento.

7. No asistir a un evento:
   El usuario/asistente envía una solicitud PUT para eliminar el evento a su array events.
   Si las credenciales son válidas, se eliminará el evento al apartado "Mis eventos" y se quitará el icono de confirmación de asistencia a ese evento. Esto también lo puede realizar desde el apartado mis eventos, seleccionando el elemente que quiere eliminar.

**ADMIN - Validar un evento, eliminar un evento y eliminar un perfil**

1. Validar un evento:
   El administrador envía una solicitud PUT para modificar el valor "validated" a true de ese evento. Si las credenciales son válidas, se añadirá el evento al apartado eventos y los usuarios y asistentes podrán ver el evento publicado.

2. Eliminar un evento:
   El administrador envía una solicitud DELETE para eliminar el evento. Si las credenciales son válidas, se eliminará el evento. Podrá hacerlo en el apartado administrador y en el apartado eventos. Este último le permite eliminar los eventos que ya han pasado por fecha.

3. Eliminar un evento:
   El administrador envía una solicitud DELETE para eliminar el perfil de un usuario o asistente. Si las credenciales son válidas, se eliminará el perfil.
