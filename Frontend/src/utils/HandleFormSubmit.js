import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading.js'
import { validatePassword } from '/src/utils/ValidatePassword'
import { API } from '/src/utils/API'
import {
  handleLoginFormSubmitAttendee,
  handleLoginFormSubmitUser
} from './HandleLoginFormSubmit'

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

    const res = await API({
      endpoint: 'attendees/register',
      method: 'POST',
      body: jsonData
    })

    const resData = res.response ? res.response : res

    if (res.status !== 201) {
      throw new Error(errorData.error)
    }

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

    const res = await API({
      endpoint: 'users/register',
      method: 'POST',
      body: formData
    })

    if (res.status !== 201) {
      throw new Error()
    }

    const userData = await res.response

    const forms = document.querySelectorAll('.form')
    handleLoginFormSubmitUser(new FormData(forms[0]))
    console.log('esto', resData)
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
