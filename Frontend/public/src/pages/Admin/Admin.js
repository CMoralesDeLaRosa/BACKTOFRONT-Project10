import '/style.css'
import './Admin.css'
import { createButton } from '../../components/Button/Button'
import {
  spanComprobarAtt,
  spanComprobarUs
} from '../../components/SpanComprobar/SpanComprobar'
import {
  hideSpinner,
  showSpinner
} from '../../components/SpinnerLoading/SpinnerLoading'

export const ListasUsersAtts = async (nodoPadre) => {
  const articleUsers = document.createElement('article')
  articleUsers.classList.add('articleUsers')
  const titulo1 = document.createElement('h3')
  titulo1.innerText = 'USUARIOS REGISTRADOS'
  articleUsers.appendChild(titulo1)

  const articleAtt = document.createElement('article')
  articleAtt.classList.add('articleAtt')
  const titulo2 = document.createElement('h3')
  titulo2.innerText = 'ASISTENTES REGISTRADOS'
  articleAtt.appendChild(titulo2)

  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No estás autorizado. Token no encontrado.')
  }

  const storedDataAdmin = JSON.parse(localStorage.getItem('admin'))

  if (storedDataAdmin === true) {
    try {
      showSpinner()
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const res = await fetch('http://localhost:3000/api/v1/users', opciones)

      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al obtener los usuarios: ${errorDetails}`)
      }

      const users = await res.json()

      if (!users || users.length === 0) {
        const mensajeNoUsuarios = document.createElement('p')
        mensajeNoUsuarios.innerText = 'NO HAY USUARIOS REGISTRADOS.'
        articleUsers.appendChild(mensajeNoEventos)
      } else {
        const ulUsers = document.createElement('ul')
        ulUsers.classList.add('flex-container')
        articleUsers.appendChild(ulUsers)
        users.forEach((user) => {
          const liUser = document.createElement('li')
          const nameUser = document.createElement('p')
          const emailUser = document.createElement('p')
          nameUser.innerText = user.name
          emailUser.innerText = user.email

          liUser.append(nameUser, emailUser)
          const button = createButton(liUser, 'sectionButton3', 'Eliminar')
          button.addEventListener('click', () =>
            spanComprobarUs(user._id, liUser)
          )

          ulUsers.appendChild(liUser)
        })
      }
    } catch (error) {
      console.error('Error al renderizar los usuarios:', error)
    } finally {
      hideSpinner()
    }

    try {
      showSpinner()
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const res = await fetch(
        'http://localhost:3000/api/v1/attendees',
        opciones
      )

      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al obtener los asistentes: ${errorDetails}`)
      }

      const attendees = await res.json()

      if (!attendees || attendees.length === 0) {
        const mensajeNoAsistentes = document.createElement('p')
        mensajeNoAsistentes.innerText = 'NO HAY ASISTENTES REGISTRADOS.'
        articleAtt.appendChild(mensajeNoAsistentes)
      } else {
        const ulAtt = document.createElement('ul')
        ulAtt.classList.add('flex-container')
        articleAtt.appendChild(ulAtt)

        attendees.forEach((attendee) => {
          const liAtt = document.createElement('li')
          const nameAtt = document.createElement('p')
          const emailAtt = document.createElement('p')
          nameAtt.innerText = attendee.name
          emailAtt.innerText = attendee.email

          liAtt.append(nameAtt, emailAtt)
          const button = createButton(liAtt, 'sectionButton3', 'Eliminar')

          button.addEventListener('click', () =>
            spanComprobarAtt(attendee._id, liAtt)
          )

          ulAtt.appendChild(liAtt)
        })
      }
    } catch (error) {
      console.error('Error al renderizar los asistentes:', error)
    } finally {
      hideSpinner()
    }
  } else {
    console.error('No se encontró un objeto válido en localStorage')
  }

  nodoPadre.append(articleUsers, articleAtt)
}

export const Admin = async () => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'admin')

  const sectionAdmin = document.createElement('section')
  sectionAdmin.classList.add('sectionAdmin', 'flex-direction')

  ListasUsersAtts(sectionAdmin)
  EventosParaValidar(sectionAdmin)

  const main = document.querySelector('main')
  main.appendChild(sectionAdmin)
}

export const EventosParaValidar = async (nodoPadre) => {
  const articleEventsVal = document.createElement('article')
  articleEventsVal.classList.add('articleEventsVal')
  const titulo1 = document.createElement('h3')
  titulo1.innerText = 'EVENTOS PENDIENTES DE VALIDACIÓN'
  articleEventsVal.appendChild(titulo1)

  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No estás autorizado. Token no encontrado.')
  }

  const storedDataAdmin = JSON.parse(localStorage.getItem('admin'))

  if (storedDataAdmin === true) {
    try {
      showSpinner()
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const res = await fetch(
        'http://localhost:3000/api/v1/events/not-verified',
        opciones
      )

      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al obtener los eventos: ${errorDetails}`)
      }

      const events = await res.json()

      if (!events || events.length === 0) {
        const mensajeNoEventos = document.createElement('p')
        mensajeNoEventos.innerText = 'NO HAY EVENTOS PARA VALIDAR.'
        mensajeNoEventos.classList.add('mensajeNoEventos')
        articleEventsVal.appendChild(mensajeNoEventos)
      }

      const divEventsVal = document.createElement('div')
      divEventsVal.classList.add('divEventsVal', 'flex-container')
      articleEventsVal.appendChild(divEventsVal)
      nodoPadre.appendChild(articleEventsVal)

      events.forEach((event) => {
        const divEventVal = document.createElement('div')
        divEventVal.classList.add('divEventVal', 'flex-container')

        const h4 = document.createElement('h4')
        h4.innerText = event.title.toUpperCase()
        const divImg = document.createElement('div')
        divImg.classList.add('divImgEvent')
        const img = document.createElement('img')
        img.src = event.img

        const fechaISO = event.date
        const fecha = new Date(fechaISO)
        const opcionesFecha = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha)
        const date = document.createElement('p')
        date.innerText = fechaFormateada + 'H'

        const description = document.createElement('p')
        description.innerText = event.description

        const divButtons = document.createElement('div')
        divButtons.classList.add('divButtons', 'flex-container')

        const buttonAccept = createButton(
          divButtons,
          'sectionButton3',
          'Validar'
        )
        const buttonCancel = createButton(
          divButtons,
          'sectionButton3',
          'Eliminar'
        )

        buttonAccept.addEventListener('click', async () => {
          await ValidarEvento(event._id)
          divEventVal.remove()
        })
        buttonCancel.addEventListener('click', async () => {
          await EliminarEvento(event._id)
          divEventVal.remove()
        })

        divImg.appendChild(img)
        divEventVal.append(divImg, h4, date, description, divButtons)
        divEventsVal.appendChild(divEventVal)
      })
    } catch (error) {
      console.error('Error al renderizar los eventos:', error)
    } finally {
      hideSpinner()
    }
  }
}

export const ValidarEvento = async (eventId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No estás autorizado. Token no encontrado.')
  }

  const storedDataAdmin = JSON.parse(localStorage.getItem('admin'))

  if (storedDataAdmin === true) {
    try {
      showSpinner()
      const opciones = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/events/${eventId}`,
        opciones
      )

      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al validar el evento: ${errorDetails}`)
      }
    } catch (error) {
      console.error('Error al validar el evento:', error)
    } finally {
      hideSpinner()
    }
  }
}

export const EliminarEvento = async (eventId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No estás autorizado. Token no encontrado.')
  }

  const storedDataAdmin = JSON.parse(localStorage.getItem('admin'))

  if (storedDataAdmin === true) {
    try {
      showSpinner()
      const opciones = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/events/${eventId}`,
        opciones
      )

      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al validar el evento: ${errorDetails}`)
      }
    } catch (error) {
      console.error('Error al validar el evento:', error)
    } finally {
      hideSpinner()
    }
  }
}
