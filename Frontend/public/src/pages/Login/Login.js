import '/style.css'
import './Login.css'
import { formLoginAttendee, formLoginUser } from '../../components/Data/Data'
import { createForm } from '../../components/Form/Form'
import { Eventos } from '../Eventos/Eventos'
import { headerLogin } from '../../components/Header/Header'
import {
  hideSpinner,
  showSpinner
} from '../../components/SpinnerLoading/SpinnerLoading'

export const Login = (nodoPadre) => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'login')
  const sectionLogin = document.createElement('section')
  sectionLogin.classList.add('flex-container', 'sectionLogin')

  const handleLoginFormSubmitUser = (formData) => {
    const existingErrors = document.querySelectorAll('.errorPLogin')
    existingErrors.forEach((error) => error.remove())

    const jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })

    fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => {
        showSpinner()
        if (response.status === 400) {
          const errorP = document.createElement('p')
          errorP.classList.add('errorPLogin')
          errorP.textContent = 'El usuario o la contraseña son incorrectos.'
          const forms = document.querySelectorAll('.form')
          const secondForm = forms[0]
          secondForm.appendChild(errorP)

          throw new Error(
            'Error 400: Los datos proporcionados son incorrectos.'
          )
        }
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))
        headerLogin()
        const main = document.querySelector('main')
        main.innerHTML = ''
        Eventos(main)
        sessionStorage.setItem('paginaActual', 'eventos')
      })
      .catch((error) => {
        console.error('Error al enviar datos al servidor:', error)
      })
      .finally(() => {
        hideSpinner()
      })
  }

  const handleLoginFormSubmitAttendee = (formData) => {
    const existingErrors = document.querySelectorAll('.errorPLogin')
    existingErrors.forEach((error) => error.remove())

    const jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })

    fetch('http://localhost:3000/api/v1/attendees/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then((response) => {
        showSpinner()
        if (response.status === 400) {
          const errorP = document.createElement('p')
          const form = document.querySelector('.loginUsers')
          errorP.classList.add('errorPLogin')
          errorP.textContent = 'El usuario o la contraseña son incorrectos.'
          const forms = document.querySelectorAll('.form')
          const secondForm = forms[1]
          secondForm.appendChild(errorP)
          throw new Error(
            'Error 400: Los datos proporcionados son incorrectos.'
          )
        }
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('attendee', JSON.stringify(data))
        headerLogin()
        const main = document.querySelector('main')
        main.innerHTML = ''
        Eventos(main)
        sessionStorage.setItem('paginaActual', 'eventos')
      })
      .catch((error) => {
        console.error('Error al enviar datos al servidor:', error)
      })
      .finally(() => {
        hideSpinner()
      })
  }

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
