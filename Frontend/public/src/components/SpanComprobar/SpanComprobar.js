import '/style.css'
import './SpanComprobar.css'
import { createButton } from '../Button/Button'
import { cerrarSesion } from '../Header/Header'
export const eliminarPerfilAttendee = async () => {
  try {
    const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
    const storedDataUs = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (storedDataAtt) {
      const { attendee } = storedDataAtt

      console.log('ID del asistente:', attendee._id)
      console.log(
        'URL:',
        `http://localhost:3000/api/v1/attendees/${attendee._id}`
      )
      console.log('Token:', token)

      const opciones = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/attendees/${attendee._id}`,
        opciones
      )

      if (!res.ok) {
        throw new Error('Error en la eliminación del perfil')
      }

      const result = await res.json()
      console.log('Perfil eliminado:', result)
      cerrarSesion()
    } else if (storedDataUs) {
      const { user } = storedDataUs

      console.log('ID del asistente:', user._id)
      console.log('URL:', `http://localhost:3000/api/v1/users/${user._id}`)
      console.log('Token:', token)

      const opciones = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/users/${user._id}`,
        opciones
      )

      if (!res.ok) {
        throw new Error('Error en la eliminación del perfil')
      }

      const result = await res.json()
      console.log('Perfil eliminado:', result)
      cerrarSesion()
    } else {
      console.error('No se encontró el objeto "attendee" en localStorage')
      return
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud de eliminación:', error)
  }
}

export const eliminarPerfilAdUs = async (userId) => {
  try {
    const token = localStorage.getItem('token')

    const opciones = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetch(
      `http://localhost:3000/api/v1/users/admin/${userId}`,
      opciones
    )

    if (!res.ok) {
      throw new Error('Error en la eliminación del perfil')
    }

    const result = await res.json()
    console.log('Perfil eliminado:', result)

    if (result) {
      const pEliminado = document.querySelector('.pEliminado')
      if (pEliminado) {
        pEliminado.remove()
      }
      const p = document.createElement('p')
      p.classList.add('pEliminado')
      p.innerText = 'Se ha eliminado el usuario correctamente'
      const articleUsers = document.querySelector('.articleUsers')
      articleUsers.appendChild(p)
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud de eliminación:', error)
  }
}

export const eliminarPerfilAdAtt = async (attendeeId) => {
  try {
    const token = localStorage.getItem('token')
    console.log(attendeeId)

    const opciones = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetch(
      `http://localhost:3000/api/v1/attendees/admin/${attendeeId}`,
      opciones
    )

    if (!res.ok) {
      throw new Error('Error en la eliminación del perfil')
    }

    const result = await res.json()
    console.log('Perfil eliminado:', result)

    if (result) {
      const pEliminado = document.querySelector('.pEliminado')
      if (pEliminado) {
        pEliminado.remove()
      }
      const p = document.createElement('p')
      p.classList.add('pEliminado')
      p.innerText = 'Se ha eliminado el asistente correctamente'
      const articleAtt = document.querySelector('.articleAtt ')
      articleAtt.appendChild(p)
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud de eliminación:', error)
  }
}

export const spanComprobar = (nodoPadre) => {
  const divSpanUs = document.createElement('div')
  divSpanUs.classList.add('spanComprobar', 'flex-container')

  const p = document.createElement('p')
  p.innerText =
    '¿Estás seguro que quieres eliminar tu perfil?\nEsta acción no se puede deshacer '

  const divButtons = document.createElement('div')

  const buttonSi = createButton(divButtons, 'sectionButton2', 'Sí')
  const buttonNo = createButton(divButtons, 'sectionButton2', 'No')

  buttonSi.addEventListener('click', () => {
    eliminarPerfilAttendee()
  })
  buttonNo.addEventListener('click', () => {
    divSpanUs.remove()
  })

  divSpanUs.append(p, divButtons)
  nodoPadre.appendChild(divSpanUs)
}

export const spanComprobarUs = (userId, liUser) => {
  const divSpanUs = document.createElement('div')
  divSpanUs.classList.add('spanComprobarUs', 'flex-container')

  const p = document.createElement('p')
  p.classList.add('pUs')
  p.innerText =
    '¿Estás seguro que quieres eliminar este usuario?\nEsta acción no se puede deshacer '

  const divButtons = document.createElement('div')

  const buttonSi = createButton(divButtons, 'sectionButton2', 'Sí')
  const buttonNo = createButton(divButtons, 'sectionButton2', 'No')

  buttonSi.addEventListener('click', () => {
    eliminarPerfilAdUs(userId)
    divSpanUs.remove()
    liUser.remove()
  })
  buttonNo.addEventListener('click', () => {
    divSpanUs.remove()
  })

  divSpanUs.append(p, divButtons)
  const articleUsers = document.querySelector('.articleUsers')
  articleUsers.appendChild(divSpanUs)
}

export const spanComprobarAtt = (attendeeId, liAtt) => {
  const divSpanAtt = document.createElement('div')
  divSpanAtt.classList.add('spanComprobarAtt', 'flex-container')

  const p = document.createElement('p')
  p.innerText =
    '¿Estás seguro que quieres eliminar este asistente?\nEsta acción no se puede deshacer '

  const divButtons = document.createElement('div')

  const buttonSi = createButton(divButtons, 'sectionButton2', 'Sí')
  const buttonNo = createButton(divButtons, 'sectionButton2', 'No')

  buttonSi.addEventListener('click', () => {
    eliminarPerfilAdAtt(attendeeId)
    divSpanAtt.remove()
    liAtt.remove()
  })
  buttonNo.addEventListener('click', () => {
    divSpanAtt.remove()
  })

  divSpanAtt.append(p, divButtons)
  const articleAtt = document.querySelector('.articleAtt')
  articleAtt.appendChild(divSpanAtt)
}
