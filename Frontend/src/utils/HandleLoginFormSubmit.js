import { headerLogin } from '/src/components/Header/Header'
import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading.js'
import { Events } from '/src/pages/Events/Events'
import { API } from '/src/utils/API'

export const handleLoginFormSubmitAttendee = async (formData) => {
  const existingErrors = document.querySelectorAll('.errorPLogin')
  existingErrors.forEach((error) => error.remove())

  const jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })

  try {
    showSpinner()

    const res = await API({
      endpoint: 'attendees/login',
      method: 'POST',
      body: jsonData
    })

    if (res.status === 400) {
      const errorP = document.createElement('p')
      const form = document.querySelector('.loginUsers')
      errorP.classList.add('errorPLogin')
      errorP.textContent = 'El usuario o la contraseña son incorrectos.'
      const forms = document.querySelectorAll('.form')
      const secondForm = forms[1]
      secondForm.appendChild(errorP)
      throw new Error('Error 400: Los datos proporcionados son incorrectos.')
    } else {
      const data = await res.response

      localStorage.setItem('token', data.token)
      localStorage.setItem('attendee', JSON.stringify(data))

      headerLogin()
      const main = document.querySelector('main')
      main.innerHTML = ''
      Events(main)
      sessionStorage.setItem('paginaActual', 'eventos')
    }
  } catch (error) {
    console.error('Error al enviar datos al servidor:', error)
  } finally {
    hideSpinner()
  }
}

export const handleLoginFormSubmitUser = async (formData) => {
  const existingErrors = document.querySelectorAll('.errorPLogin')
  existingErrors.forEach((error) => error.remove())

  const jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })

  try {
    showSpinner()

    const res = await API({
      endpoint: 'users/login',
      method: 'POST',
      body: jsonData
    })

    if (res.status === 400) {
      const errorP = document.createElement('p')
      errorP.classList.add('errorPLogin')
      errorP.textContent = 'El usuario o la contraseña son incorrectos.'
      const forms = document.querySelectorAll('.form')
      const secondForm = forms[0]
      secondForm.appendChild(errorP)
      throw new Error('Error 400: Los datos proporcionados son incorrectos.')
    } else {
      const data = await res.response

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))

      headerLogin()
      const main = document.querySelector('main')
      main.innerHTML = ''
      Events(main)
      sessionStorage.setItem('paginaActual', 'eventos')
    }
  } catch (error) {
    console.error('Error al enviar datos al servidor:', error)
  } finally {
    hideSpinner()
  }
}
