import { createButton } from '../components/Button/Button'
import {
  hideSpinner,
  showSpinner
} from '../components/SpinnerLoading/SpinnerLoading'
import { validatePassword } from './ValidatePassword'
import { API } from '/public/src/utils/API'
export const updateUser = async (updateData) => {
  try {
    showSpinner()
    const p1 = document.querySelector('.pErrorPas')
    if (p1) p1.remove()
    const p2 = document.querySelector('.pErrorDup')
    if (p2) p2.remove()
    const p3 = document.querySelector('.errorPRegister')
    if (p3) p3.remove()
    const p4 = document.querySelector('.pRes')
    if (p4) p4.remove()

    const storedDataUs = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const { user } = storedDataUs

    const formData = new FormData()
    updateData.forEach((value, key) => {
      if (value) {
        formData.append(key, value)
      }
    })

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
      const UpdateUsers = document.querySelector('.UpdateUsers')
      const existingpErrorPas = document.querySelector('.pErrorPas')
      if (existingpErrorPas) {
        existingpErrorPas.remove()
      }

      const pErrorPas = document.createElement('p')
      pErrorPas.classList.add('pErrorPas')
      pErrorPas.innerText =
        'La contraseña debe tener máximo 8 caracteres, al menos una mayúscula y al menos un número.'
      UpdateUsers.appendChild(pErrorPas)
      return
    }

    const res = await API({
      endpoint: `users/update/${user._id}`,
      method: 'PUT',
      body: formData,
      token
    })

    const resData = res.response ? res.response : res

    if (res.status !== 200) {
      const errorDetails = await res.text()
      console.error('Error en la respuesta:', errorDetails)

      const UpdateUsers = document.querySelector('.UpdateUsers')
      const existingpErrorDup = UpdateUsers.querySelector('.pErrorDup')
      if (existingpErrorDup) existingpErrorDup.remove()

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

      UpdateUsers.appendChild(pErrorDup)

      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const respuesta = await res.response

    const updatedUser = { ...user, ...respuesta }
    localStorage.setItem('user', JSON.stringify({ user: updatedUser }))

    const UpdateUsers = document.querySelector('.UpdateUsers')
    const existingPRes = UpdateUsers.querySelector('.pRes')
    if (existingPRes) existingPRes.remove()

    const pRes = document.createElement('p')
    pRes.classList.add('pRes')
    pRes.innerText = 'Has actualizado los datos'
    UpdateUsers.appendChild(pRes)
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
    const divImg = document.createElement('div')
    const img = document.createElement('img')
    img.src = updatedUser.img

    pName.innerText = ('Nombre | ' + updatedUser.name).toUpperCase()
    pEmail.innerText = ('Email | ' + updatedUser.email).toUpperCase()

    divImg.appendChild(img)
    divDatos.append(p, divImg, pName, pEmail)
    createButton(divDatos, 'sectionButton1', 'Elimina tu perfil')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    hideSpinner()
  }
}
