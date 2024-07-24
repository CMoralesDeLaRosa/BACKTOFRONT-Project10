import '/style.css'
import './EventInfo.css'
import { renderAttendeesUsersByEvent } from '../../utils/RenderUsersByEvent'
import { attendEvent } from '../../utils/AttendEvent'
import { NoAttendEvent } from '../../utils/NoAttendEvent'
import {
  IconAttendee1,
  IconAttendee2
} from '../../components/IconAttendee/IconAttendee'

export const EventInfo = (evento) => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem(
    'paginaActual',
    JSON.stringify({ type: 'evento', evento })
  )

  const mainNode = document.querySelector('main')
  mainNode.innerHTML = ''

  const sectionEventoInfo = document.createElement('section')
  sectionEventoInfo.classList.add('sectionEventoInfo', 'flex-container')

  const articleEventoInfo = document.createElement('article')
  articleEventoInfo.classList.add('articleEventoInfo')
  const divImg = document.createElement('div')
  const imgEvento = document.createElement('img')
  imgEvento.src = evento.img
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
  const description = document.createElement('p')
  description.innerText = evento.description

  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))

  if (storedDataAtt && storedDataAtt.attendee.events.includes(evento._id)) {
    IconAttendee1(divInfo, () => NoAttendEvent(evento._id))
  } else if (storedDataUs && storedDataUs.user.events.includes(evento._id)) {
    IconAttendee1(divInfo, () => NoAttendEvent(evento._id))
  } else {
    IconAttendee2(divInfo, () => attendEvent(evento._id))
  }

  divImg.appendChild(imgEvento)
  divInfo.append(title, date, location, description)
  articleEventoInfo.append(divImg, divInfo)
  sectionEventoInfo.appendChild(articleEventoInfo)
  mainNode.appendChild(sectionEventoInfo)

  renderAttendeesUsersByEvent(evento)
}
