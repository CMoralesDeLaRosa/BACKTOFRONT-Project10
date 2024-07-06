import '/style.css'
import './Perfil.css'
import { createForm } from '../../components/Form/Form'
import {
  formUpdateAttendees,
  formUpdateUsers
} from '../../components/Data/Data'
import { validatePassword } from '../Register/Register'
import { createButton } from '../../components/Button/Button'
import { spanComprobar } from '../../components/SpanComprobar/SpanComprobar'
import {
  hideSpinner,
  showSpinner
} from '../../components/SpinnerLoading/SpinnerLoading'

export const Perfil = () => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'perfil')
  const mainNode = document.querySelector('main')
  mainNode.innerHTML = ''
  const sectionPerfil = document.createElement('section')
  sectionPerfil.classList.add('perfil', 'flex-container')
  mainNode.appendChild(sectionPerfil)

  const pPerfil = document.createElement('p')
  pPerfil.innerText = 'Aquí puedes cambiar los datos de tu cuenta'.toUpperCase()

  const articlePerfil = document.createElement('article')
  articlePerfil.classList.add('articlePerfil', 'flex-container')

  const divDatos = document.createElement('div')
  divDatos.classList.add('divDatos', 'flex-container')

  const p = document.createElement('p')
  p.innerText = 'Estos son los datos de tu cuenta'.toUpperCase()

  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))

  if (storedDataAtt) {
    const { attendee } = storedDataAtt
    const pName = document.createElement('p')
    const pEmail = document.createElement('p')

    pName.innerText = ('Nombre | ' + attendee.name).toUpperCase()
    pEmail.innerText = ('Email | ' + attendee.email).toUpperCase()

    divDatos.append(p, pName, pEmail)
    const buttonEliminar = createButton(
      divDatos,
      'sectionButton1',
      'Elimina tu perfil'
    )

    buttonEliminar.addEventListener('click', () => spanComprobar(sectionPerfil))
    articlePerfil.append(divDatos)

    createForm(
      articlePerfil,
      '¿Qué datos quieres cambiar?',
      'Añade los datos que quieres modificar de tu perfil',
      formUpdateAttendees,
      'UpdateAttendees',
      updateAttendees
    )
  } else if (storedDataUs) {
    const { user } = storedDataUs
    const pName = document.createElement('p')
    const pEmail = document.createElement('p')
    const divImg = document.createElement('div')
    const img = document.createElement('img')

    pName.innerText = ('Nombre | ' + user.name).toUpperCase()
    pEmail.innerText = ('Email | ' + user.email).toUpperCase()
    img.src = user.img

    divImg.appendChild(img)
    divDatos.append(p, divImg, pName, pEmail)

    const buttonEliminar = createButton(
      divDatos,
      'sectionButton1',
      'Elimina tu perfil'
    )
    const sectionPerfil = document.querySelector('.perfil')
    buttonEliminar.addEventListener('click', () => spanComprobar(sectionPerfil))
    articlePerfil.append(divDatos)

    createForm(
      articlePerfil,
      '¿Qué datos quieres cambiar?',
      'Añade los datos que quieres modificar de tu perfil',
      formUpdateUsers,
      'UpdateUsers',
      updateUsers
    )
  }

  sectionPerfil.append(pPerfil, articlePerfil)
}

export const updateAttendees = async (updateData) => {
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

    const opciones = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(jsonData)
    }

    const res = await fetch(
      `http://localhost:3000/api/v1/attendees/update/${attendee._id}`,
      opciones
    )

    if (!res.ok) {
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

    const respuesta = await res.json()

    const updatedAttendee = { ...attendee, ...respuesta }
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

export const updateUsers = async (updateData) => {
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

    const opciones = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }

    const res = await fetch(
      `http://localhost:3000/api/v1/users/update/${user._id}`,
      opciones
    )

    if (!res.ok) {
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

    const respuesta = await res.json()

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
