import '/style.css'
import './Eventos.css'
import { EventoInfo, eliminarEvento } from '../EventoInfo/EventoInfo'
import { BannerHello } from '../../components/BannerHello/BannerHello'
import { formCreateEvent } from '../../components/Data/Data'
import { createForm } from '../../components/Form/Form'
import { Footer } from '../../components/Footer/Footer'
import { EliminarEvento } from '../Admin/Admin'
import {
  hideSpinner,
  showSpinner
} from '../../components/SpinnerLoading/SpinnerLoading'

export const misEventos = async () => {
  const sectionEventos = document.querySelector('.sectionEventos')
  const articleMisEventos = document.createElement('article')
  articleMisEventos.classList.add('misEventos', 'flex-container')
  sectionEventos.appendChild(articleMisEventos)

  const titulo = document.createElement('h3')
  titulo.innerText = 'MIS EVENTOS'
  const divEventosFav = document.createElement('div')
  divEventosFav.classList.add('divEventosFav')
  articleMisEventos.appendChild(titulo)
  articleMisEventos.appendChild(divEventosFav)

  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  let res

  try {
    showSpinner()
    const opciones = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    if (storedDataAtt) {
      const { attendee } = storedDataAtt
      res = await fetch(
        `http://localhost:3000/api/v1/attendees/${attendee._id}`,
        opciones
      )
      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(
          `Error al obtener eventos del attendee: ${errorDetails}`
        )
      }
    } else if (storedDataUs) {
      const { user } = storedDataUs
      res = await fetch(
        `http://localhost:3000/api/v1/users/${user._id}`,
        opciones
      )
      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al obtener eventos del usuario: ${errorDetails}`)
      }
    } else {
      console.error('No se encontró un objeto válido en localStorage')
      return
    }

    const { events } = await res.json()
    events.sort((a, b) => new Date(a.date) - new Date(b.date))

    if (!events || events.length === 0) {
      const mensajeNoEventos = document.createElement('p')
      mensajeNoEventos.innerText = 'NO HAS AÑADIDO EVENTOS A TU LISTA.'
      divEventosFav.appendChild(mensajeNoEventos)
    } else {
      events.forEach((event) => {
        const divEventFav = document.createElement('div')
        divEventFav.classList.add('divEventFav')
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

        const divHover = document.createElement('div')
        divHover.classList.add('divHover', 'flex-container')
        const imgHover = document.createElement('img')
        imgHover.src = '/public/assets/Icono papelera.png'

        divHover.appendChild(imgHover)
        divImg.appendChild(img)
        divEventFav.append(divHover, divImg, h4, date)
        divEventosFav.appendChild(divEventFav)

        divEventFav.addEventListener('click', async () => {
          try {
            const response = await eliminarEvento(event._id)
            if (response) {
              divEventosFav.removeChild(divEventFav)
            } else {
              console.error('Error al eliminar evento:', response)
            }
          } catch (error) {
            console.error('Error al eliminar evento:', error)
          }
        })
      })
    }
  } catch (error) {
    console.error('Error al obtener eventos del attendee:', error)
  } finally {
    hideSpinner()
  }
}

export const crearEvento = (nodoPadre) => {
  const crearEvento = document.createElement('article')
  crearEvento.classList.add('crearEvento', 'flex-container')

  const titulo = document.createElement('h3')
  titulo.innerText = 'CREA TU EVENTO'
  crearEvento.appendChild(titulo)

  createForm(
    crearEvento,
    '',
    'Cuéntanos todo sobre tu evento, dónde, cuándo y cómo será. Así nuevos asistentes podrán conocerlo',
    formCreateEvent,
    'createEvent',
    handleCreateEvent
  )

  nodoPadre.appendChild(crearEvento)
}

export const handleCreateEvent = async (formData) => {
  const p1 = document.querySelector('.pError')
  if (p1) p1.remove()
  const p2 = document.querySelector('.pOK')
  if (p2) p2.remove()

  const token = localStorage.getItem('token')

  const jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })

  try {
    showSpinner()
    const opciones = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }

    const res = await fetch(`http://localhost:3000/api/v1/events`, opciones)

    if (!res.ok) {
      throw new Error('Error en la creación del evento')
    }

    const eventData = await res.json()
    const form = document.querySelector('.form')
    if (form) {
      form.reset()
    }

    let pOK = document.querySelector('.pOK')
    if (pOK) {
      pOK.innerText =
        'Has creado el evento correctamente. Será revisado y publicado a la mayor brevedad.'
    } else {
      const p1 = document.querySelector('.pError')
      if (p1) p1.remove()
      const p = document.createElement('p')
      p.classList.add('pOK')
      p.innerText =
        'Has creado el evento correctamente. Será revisado y publicado a la mayor brevedad.'
      const crearEvento = document.querySelector('.crearEvento')
      crearEvento.appendChild(p)
    }
  } catch (error) {
    if (
      !jsonData.name ||
      !jsonData.date ||
      !jsonData.location ||
      !jsonData.description ||
      !jsonData.img
    ) {
      const pError = document.createElement('p')
      pError.classList.add('pError')
      pError.innerText = 'Faltan campos por completar'
      const crearEvento = document.querySelector('.crearEvento')
      crearEvento.appendChild(pError)
    }
  } finally {
    hideSpinner()
  }
}

export const getEventos = (eventos, nodoPadre) => {
  eventos.sort((a, b) => new Date(a.date) - new Date(b.date))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))

  eventos.forEach((evento) => {
    const divEvento = document.createElement('div')
    divEvento.classList.add('divEvento', 'flex-container')

    const divImg = document.createElement('div')
    const img = document.createElement('img')
    img.src = evento.img

    const divInfo = document.createElement('div')
    const title = document.createElement('h3')
    title.innerText = evento.title.toUpperCase()
    const fechaISO = evento.date
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
    const location = document.createElement('p')
    location.innerText = evento.location.toUpperCase()

    const buttonMas = document.createElement('button')
    buttonMas.classList.add('buttonMas')
    buttonMas.innerText = '+'
    buttonMas.addEventListener('click', () => EventoInfo(evento))

    divImg.appendChild(img)
    divInfo.append(title, date, location, buttonMas)

    if (storedDataUs && storedDataUs.user && storedDataUs.user.rol) {
      const { user } = storedDataUs
      const rol = user.rol
      if (rol === 'admin') {
        const buttonAdmin = document.createElement('button')
        buttonAdmin.classList.add('buttonAdmin')
        buttonAdmin.innerText = 'Eliminar'
        divImg.appendChild(buttonAdmin)

        buttonAdmin.addEventListener('click', async () => {
          await EliminarEvento(evento._id)
          divEvento.remove()
        })
      }
    }

    divEvento.append(divImg, divInfo)
    nodoPadre.appendChild(divEvento)
  })
}

export const Eventos = async (nodoPadre) => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'eventos')
  const sectionEventos = document.createElement('section')
  sectionEventos.classList.add('sectionEventos')
  nodoPadre.appendChild(sectionEventos)
  BannerHello(sectionEventos)

  const storedDataUs = JSON.parse(localStorage.getItem('user'))
  if (storedDataUs) {
    const sectionEventos = document.querySelector('.sectionEventos')
    crearEvento(sectionEventos)
    misEventos()
  } else {
    misEventos()
  }

  try {
    showSpinner()
    const res = await fetch('http://localhost:3000/api/v1/events')
    if (!res.ok) {
      throw new Error('Error al obtener eventos desde la API')
    }

    const eventos = await res.json()

    const articleEventos = document.createElement('article')
    articleEventos.classList.add('articleEventos')
    getEventos(eventos, articleEventos)

    sectionEventos.appendChild(articleEventos)
  } catch (error) {
    console.error('Error al obtener eventos:', error)
  } finally {
    hideSpinner()
  }
}
