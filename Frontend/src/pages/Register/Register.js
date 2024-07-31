import '/style.css'
import './Register.css'
import { createForm } from '/src/components/Form/Form'
import { formFieldsAttendees, formFieldsUser } from '/src/utils/Data.js'
import {
  handleAttendeeFormSubmit,
  handleUserFormSubmit
} from '/src/utils/HandleFormSubmit'

export const Register = (nodoPadre) => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'register')
  const sectionRegister = document.createElement('article')
  sectionRegister.classList.add('flex-container', 'sectionRegister')

  createForm(
    sectionRegister,
    'Regístrate como usuario',
    'Crea tu perfil y podrás publicar tus propios eventos, además de conocer experiencias únicas',
    formFieldsUser,
    'registerUsers',
    handleUserFormSubmit
  )

  createForm(
    sectionRegister,
    'Regístrate como asistente',
    'Regístrate y tendrás la oportunidad de conocer y asistir a eventos increíbles',
    formFieldsAttendees,
    'registerAttendees',
    handleAttendeeFormSubmit
  )

  nodoPadre.appendChild(sectionRegister)
}
