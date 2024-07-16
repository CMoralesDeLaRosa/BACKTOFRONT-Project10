import '/style.css'
import './Register.css'
import { createForm } from '../../components/Form/Form'
import { formFieldsAttendees, formFieldsUser } from '../../components/Data/Data'
import {
  hideSpinner,
  showSpinner
} from '../../components/SpinnerLoading/SpinnerLoading'
import {
  handleLoginFormSubmitAttendee,
  handleLoginFormSubmitUser
} from '../Login/Login'

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
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,8}$/
  return passwordRegex.test(password)
}
export const handleUserFormSubmit = async (formData) => {
  const existingErrors = document.querySelectorAll('.errorPRegister')
  existingErrors.forEach((error) => error.remove())

  const registerP = document.querySelector('.registradoP')
  if (registerP) {
    registerP.remove()
  }

  const jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })

  if (!validatePassword(jsonData.password)) {
    const errorP = document.createElement('p')
    errorP.classList.add('errorPRegister')
    errorP.textContent =
      'La contraseña debe tener entre 1 y 8 caracteres, al menos una mayúscula y un número.'
    const forms = document.querySelectorAll('.form')
    const secondForm = forms[0]
    secondForm.appendChild(errorP)
    return
  }

  try {
    showSpinner()
    const res = await fetch('http://localhost:3000/api/v1/users/register', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error)
    }

    const userRegister = await res.json()

    const forms = document.querySelectorAll('.form')
    handleLoginFormSubmitUser(new FormData(forms[0]))
  } catch (error) {
    const errorP = document.createElement('p')
    errorP.classList.add('errorPRegister')
    errorP.textContent = error.message
    const forms = document.querySelectorAll('.form')
    const secondForm = forms[0]
    secondForm.appendChild(errorP)
  } finally {
    hideSpinner()
  }
}

export const handleAttendeeFormSubmit = async (formData) => {
  const existingErrors = document.querySelectorAll('.errorPRegister')
  existingErrors.forEach((error) => error.remove())

  const registerP = document.querySelector('.registradoP')
  if (registerP) {
    registerP.remove()
  }

  const jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })

  if (!validatePassword(jsonData.password)) {
    const errorP = document.createElement('p')
    errorP.classList.add('errorPRegister')
    errorP.textContent =
      'La contraseña debe tener entre 1 y 8 caracteres, al menos una mayúscula y un número.'
    const forms = document.querySelectorAll('.form')
    const secondForm = forms[1]
    secondForm.appendChild(errorP)
    return
  }

  try {
    showSpinner()
    const res = await fetch('http://localhost:3000/api/v1/attendees/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.log('Error en la respuesta del servidor:', errorData)
      throw new Error(errorData.error)
    }

    const attendeeRegister = await res.json()

    const forms = document.querySelectorAll('.form')
    handleLoginFormSubmitAttendee(new FormData(forms[1]))
  } catch (error) {
    console.log('Error en la solicitud de registro:', error)
    const errorP = document.createElement('p')
    errorP.classList.add('errorPRegister')
    errorP.textContent = error.message
    const forms = document.querySelectorAll('.form')
    const secondForm = forms[1]
    secondForm.appendChild(errorP)
  } finally {
    hideSpinner()
  }
}
