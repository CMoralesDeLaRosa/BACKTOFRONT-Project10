import '/style.css'
import './Login.css'
import { formLoginAttendee, formLoginUser } from '/public/src/utils/Data.js'
import { createForm } from '../../components/Form/Form'
import {
  handleLoginFormSubmitAttendee,
  handleLoginFormSubmitUser
} from '../../utils/HandleLoginFormSubmit'

export const Login = (nodoPadre) => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'login')
  const sectionLogin = document.createElement('section')
  sectionLogin.classList.add('flex-container', 'sectionLogin')

  createForm(
    sectionLogin,
    'Inicia sesión como usuario',
    '',
    formLoginUser,
    'loginUsers',
    handleLoginFormSubmitUser
  )

  createForm(
    sectionLogin,
    'Inicia sesión como asistente',
    '',
    formLoginAttendee,
    'loginAttendees',
    handleLoginFormSubmitAttendee
  )

  nodoPadre.appendChild(sectionLogin)
}
