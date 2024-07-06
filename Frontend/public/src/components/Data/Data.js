import '/style.css'
import { Home } from '../../pages/Home/Home'
import { Login } from '../../pages/Login/Login'
import { Register } from '../../pages/Register/Register'
import { Eventos } from '../../pages/Eventos/Eventos'
import { Perfil } from '../../pages/Perfil/Perfil'
import { Admin } from '../../pages/Admin/Admin'

export const dataMain = {
  title: 'Vive la experiencia'
}

export const parrafosHome = [
  '· Descubre los mejores eventos cerca de tu zona ·',
  '· Crea tus propios eventos y consigue un gran público ·',
  '· Conoce personas interesadas en el mismo tipo de eventos y crea nuevas redes ·'
]

export const formLoginUser = [
  {
    label: 'Email',
    type: 'email',
    id: 'email-loguin-user',
    name: 'email',
    placeholder: 'Escribe tu correo...'
  },
  {
    label: 'Contraseña',
    type: 'password',
    id: 'password-loguin-user',
    name: 'password',
    placeholder: 'Escribe tu contraseña...'
  }
]

export const formLoginAttendee = [
  {
    label: 'Email',
    type: 'email',
    id: 'email-loguin-attendee',
    name: 'email',
    placeholder: 'Escribe tu correo...'
  },
  {
    label: 'Contraseña',
    type: 'password',
    id: 'password-loguin-attendee',
    name: 'password',
    placeholder: 'Escribe tu contraseña...'
  }
]

export const formFieldsUser = [
  {
    label: 'Nombre',
    type: 'text',
    id: 'name-user',
    name: 'name',
    placeholder: 'Escribe tu nombre...'
  },
  {
    label: 'Email',
    type: 'email',
    id: 'email-user',
    name: 'email',
    placeholder: 'Escribe tu correo...'
  },
  {
    label: 'Contraseña',
    type: 'password',
    id: 'password-user',
    name: 'password',
    placeholder: 'Elige una contraseña...'
  },
  {
    label: 'Foto perfil',
    type: 'file',
    id: 'image-user',
    name: 'img',
    placeholder: 'Elige tu mejor foto...'
  }
]

export const formFieldsAttendees = [
  {
    label: 'Nombre',
    type: 'text',
    id: 'name-asistent',
    name: 'name',
    placeholder: 'Escribe tu nombre...'
  },
  {
    label: 'Email',
    type: 'email',
    id: 'email-asistent',
    name: 'email',
    placeholder: 'Escribe tu correo...'
  },
  {
    label: 'Contraseña',
    type: 'password',
    id: 'password-asistent',
    name: 'password',
    placeholder: 'Elige una contraseña...'
  }
]

export const formUpdateAttendees = [
  {
    label: 'Nombre',
    type: 'text',
    id: 'name-asistent',
    name: 'name',
    placeholder: 'Cambia tu nombre de usuario...',
    required: false
  },
  {
    label: 'Email',
    type: 'email',
    id: 'email-asistent',
    name: 'email',
    placeholder: 'Cambia tu correo...',
    required: false
  },
  {
    label: 'Contraseña',
    type: 'password',
    id: 'password-asistent',
    name: 'password',
    placeholder: 'Cambia contraseña...',
    required: false
  }
]

export const formUpdateUsers = [
  {
    label: 'Nombre',
    type: 'text',
    id: 'name-asistent',
    name: 'name',
    placeholder: 'Cambia tu nombre de usuario...'
  },
  {
    label: 'Email',
    type: 'email',
    id: 'email-asistent',
    name: 'email',
    placeholder: 'Cambia tu correo...'
  },
  {
    label: 'Contraseña',
    type: 'password',
    id: 'password-asistent',
    name: 'password',
    placeholder: 'Cambia contraseña...'
  },
  {
    label: 'Foto perfil',
    type: 'file',
    id: 'image-user',
    name: 'img',
    placeholder: 'Cambia tu foto de perfil...'
  }
]

export const formCreateEvent = [
  {
    label: 'TÍTULO',
    type: 'text',
    id: 'event-title',
    name: 'title',
    placeholder: '¿Cuál es el nombre de tu evento?'
  },
  {
    label: 'FECHA',
    type: 'datetime-local',
    id: 'event-date',
    name: 'date',
    placeholder: '¿Cuándo es tu evento?'
  },
  {
    label: 'LOCALIZACIÓN',
    type: 'text',
    id: 'event-location',
    name: 'location',
    placeholder: '¿Dónde será tu evento?'
  },
  {
    label: 'DESCRIPCIÓN',
    type: 'text',
    id: 'event-description',
    name: 'description',
    placeholder: 'Cuenta cómo será tu evento'
  },
  {
    label: 'IMAGEN',
    type: 'file',
    id: 'event-image',
    name: 'img',
    placeholder: 'Pon una foto sobre tu evento'
  }
]

export const routes = [
  { texto: 'Inicia sesión', funcion: Login },
  { texto: 'Regístrate', funcion: Register },
  { texto: 'Eventos', funcion: Eventos },
  { texto: 'Mi perfil', funcion: Perfil },
  { texto: 'Admin', funcion: Admin }
]
