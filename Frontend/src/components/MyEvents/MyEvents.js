import '/style.css'
import './MyEvents.css'
import { NoAttendEvent } from '/src/utils/NoAttendEvent'
import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading'
import { API } from '/src/utils/API'

export const myEvents = async () => {
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

  let events = []

  try {
    showSpinner()

    if (storedDataAtt) {
      const { attendee } = storedDataAtt

      if (!token) {
        throw new Error('No estás autorizado. Token no encontrado.')
      }

      const { status, response } = await API({
        endpoint: `/attendees/${attendee._id}`,
        token
      })

      if (status !== 200) {
        throw new Error(`Error en la respuesta de la API: ${status}`)
      }

      events = response.events
    } else if (storedDataUs) {
      const { user } = storedDataUs

      if (!token) {
        throw new Error('No estás autorizado. Token no encontrado.')
      }

      const { status, response } = await API({
        endpoint: `/users/${user._id}`,
        token
      })

      if (status !== 200) {
        throw new Error(`Error en la respuesta de la API: ${status}`)
      }

      events = response.events
    } else {
      console.error('No se encontró un objeto válido en localStorage')
      return
    }

    if (!events || events.length === 0) {
      const mensajeNoEventos = document.createElement('p')
      mensajeNoEventos.innerText = 'NO HAS AÑADIDO EVENTOS A TU LISTA.'
      divEventosFav.appendChild(mensajeNoEventos)
    } else {
      events.sort((a, b) => new Date(a.date) - new Date(b.date))

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
        date.innerText = fechaFormateada + ' H'

        const divHover = document.createElement('div')
        divHover.classList.add('divHover', 'flex-container')
        const imgHover = document.createElement('img')
        imgHover.src = '/assets/Icono papelera.png'

        divHover.appendChild(imgHover)
        divImg.appendChild(img)
        divEventFav.append(divHover, divImg, h4, date)
        divEventosFav.appendChild(divEventFav)

        divEventFav.addEventListener('click', async () => {
          try {
            const response = await NoAttendEvent(event._id)
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
