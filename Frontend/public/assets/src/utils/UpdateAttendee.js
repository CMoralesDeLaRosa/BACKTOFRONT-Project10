import { createButton } from '../components/Button/Button'
import {
  hideSpinner,
  showSpinner
} from '../components/SpinnerLoading/SpinnerLoading'
import { validatePassword } from './ValidatePassword'
import { API } from '/public/src/utils/API'

export const updateAttendee = async (updateData) => {
  try {
    showSpinner()
    const p1 = document.querySelector('.pErrorPas')
    if (p1) {
      p1.remove()
    }
    const p2 = document.querySelector('.pErrorDup')
    if (p2) {
      p2.remove()
    }
    const p3 = document.querySelector('.errorPRegister')
    if (p3) {
      p3.remove()
    }
    const p4 = document.querySelector('.pRes')
    if (p4) {
      p4.remove()
    }

    const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
    const token = localStorage.getItem('token')

    const { attendee } = storedDataAtt

    const jsonData = {}
    updateData.forEach((value, key) => {
      jsonData[key] = value
    })

    Object.keys(jsonData).forEach((key) => {
      if (jsonData[key] === '') {
        delete jsonData[key]
      }
    })

    if (jsonData.password && !validatePassword(jsonData.password)) {
      const UpdateAttendees = document.querySelector('.UpdateAttendees')
      const existingpErrorPas = document.querySelector('.pErrorPas')
      if (existingpErrorPas) {
        existingpErrorPas.remove()
      }

      const pErrorPas = document.createElement('p')
      pErrorPas.classList.add('pErrorPas')
      pErrorPas.innerText =
        'La contraseña debe tener máximo 8 caracteres, al menos una mayúscula y al menos un número.'
      UpdateAttendees.appendChild(pErrorPas)
      return
    }

    const res = await API({
      endpoint: `attendees/update/${attendee._id}`,
      method: 'PUT',
      body: jsonData,
      token
    })

    if (res.status != 200) {
      const errorDetails = await res.text()
      console.error('Error en la respuesta:', errorDetails)

      const UpdateAttendees = document.querySelector('.UpdateAttendees')
      const existingpErrorDup = UpdateAttendees.querySelector('.pErrorDup')
      if (existingpErrorDup) {
        existingpErrorDup.remove()
      }

      const pErrorDup = document.createElement('p')
      pErrorDup.classList.add('pErrorDup')

      if (
        errorDetails.includes('duplicate key error') &&
        errorDetails.includes('name')
      ) {
        pErrorDup.textContent = 'El nombre ya está en uso.'
      } else if (
        errorDetails.includes('duplicate key error') &&
        errorDetails.includes('email')
      ) {
        pErrorDup.textContent = 'El correo electrónico ya está en uso.'
      } else {
        pErrorDup.textContent =
          'Error al actualizar los datos. Inténtalo de nuevo.'
      }

      UpdateAttendees.appendChild(pErrorDup)

      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const respuesta = await res

    const updatedAttendee = { ...attendee, ...respuesta.response }

    localStorage.setItem(
      'attendee',
      JSON.stringify({ attendee: updatedAttendee })
    )

    const UpdateAttendees = document.querySelector('.UpdateAttendees')
    const existingPRes = UpdateAttendees.querySelector('.pRes')
    if (existingPRes) {
      existingPRes.remove()
    }

    const pRes = document.createElement('p')
    pRes.classList.add('pRes')
    pRes.innerText = 'Has actualizado los datos'
    UpdateAttendees.appendChild(pRes)

    const form = document.querySelector('.form')
    if (form) {
      form.reset()
    }

    const divDatos = document.querySelector('.divDatos')
    divDatos.innerHTML = ''

    const p = document.createElement('p')
    p.innerText = 'Estos son los datos de tu cuenta'.toUpperCase()

    const pName = document.createElement('p')
    const pEmail = document.createElement('p')

    pName.innerText = ('Nombre | ' + updatedAttendee.name).toUpperCase()
    pEmail.innerText = ('Email | ' + updatedAttendee.email).toUpperCase()

    divDatos.append(p, pName, pEmail)
    createButton(divDatos, 'sectionButton1', 'Elimina tu perfil')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    hideSpinner()
  }
}
