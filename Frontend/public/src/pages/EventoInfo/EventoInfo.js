import '/style.css'
import './EventoInfo.css'
import {
  hideSpinner,
  showSpinner
} from '../../components/SpinnerLoading/SpinnerLoading'

const renderAttendeesUsersByEvent = async (evento) => {
  try {
    showSpinner()
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No estás autorizado. Token no encontrado.')
    }

    const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
    const storedDataUs = JSON.parse(localStorage.getItem('user'))

    const articleEventoAtt = document.createElement('article')
    articleEventoAtt.classList.add('articleEventoAtt', 'flex-container')
    const h4 = document.createElement('h4')
    h4.innerText = 'Asistentes a este evento'.toUpperCase()
    const sectionEventoInfo = document.querySelector('.sectionEventoInfo')
    articleEventoAtt.appendChild(h4)
    sectionEventoInfo.appendChild(articleEventoAtt)

    let res

    if (storedDataAtt || storedDataUs) {
      res = await fetch(
        `http://localhost:3000/api/v1/events/attendees/${evento._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
    } else {
      console.error('No se encontró un objeto válido en localStorage')
      return
    }

    if (!res.ok) {
      const articleEventoAtt = document.querySelector('.articleEventoAtt')
      const pNoAsistentes = document.createElement('p')
      pNoAsistentes.innerText =
        'Este evento no tiene ningún asistente todavía'.toUpperCase()
      articleEventoAtt.appendChild(pNoAsistentes)
      throw new Error('Error al obtener los asistentes y usuarios')
    }

    const data = await res.json()
    console.log('Datos obtenidos:', data)

    const ulAtt = document.createElement('ul')

    data.forEach((item) => {
      const liAtt = document.createElement('li')
      liAtt.innerText = `${item.name}`.toUpperCase()
      ulAtt.appendChild(liAtt)
    })

    articleEventoAtt.appendChild(ulAtt)
  } catch (error) {
    console.error('Error en renderAttendeesUsersByEvent:', error)
  } finally {
    hideSpinner()
  }
}

export const EventoInfo = (evento) => {
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

  const iconAsistir = document.createElement('div')
  iconAsistir.classList.add('iconAsistir')

  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))

  if (storedDataAtt && storedDataAtt.attendee.events.includes(evento._id)) {
    iconAsistir.innerHTML = ''
    const icon1 = document.createElement('img')
    icon1.src = '/public/assets/Icono asistir 2.png'
    iconAsistir.appendChild(icon1)
    iconAsistir.addEventListener('click', () => eliminarEvento(evento._id))
  } else if (storedDataUs && storedDataUs.user.events.includes(evento._id)) {
    iconAsistir.innerHTML = ''
    const icon1 = document.createElement('img')
    icon1.src = '/public/assets/Icono asistir 2.png'
    iconAsistir.appendChild(icon1)
    iconAsistir.addEventListener('click', () => eliminarEvento(evento._id))
  } else {
    iconAsistir.innerHTML = ''
    const icon2 = document.createElement('img')
    icon2.src = '/public/assets/Icono asistir 1.png'
    iconAsistir.appendChild(icon2)
    iconAsistir.addEventListener('click', () => asistirEvento(evento._id))
  }

  divImg.appendChild(imgEvento)
  divInfo.append(title, date, location, description, iconAsistir)
  articleEventoInfo.append(divImg, divInfo)
  sectionEventoInfo.appendChild(articleEventoInfo)
  mainNode.appendChild(sectionEventoInfo)

  renderAttendeesUsersByEvent(evento)
}

export const asistirEvento = async (idEvento) => {
  try {
    showSpinner()
    const iconAsistir = document.querySelector('.iconAsistir')
    if (iconAsistir) {
      iconAsistir.innerHTML = ''
      const iconImg = document.createElement('img')
      iconImg.src = '/public/assets/Icono asistir 2.png'
      iconAsistir.appendChild(iconImg)
      iconAsistir.addEventListener('click', () => eliminarEvento(idEvento))
    } else {
      console.error('Elemento .iconAsistir no encontrado')
      return
    }

    const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
    const storedDataUs = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (!token) {
      console.error('Token no encontrado')
      return
    }

    if (storedDataAtt) {
      const { attendee } = storedDataAtt
      if (!attendee || !attendee._id) {
        console.error(
          'El objeto "attendee" no tiene una propiedad "_id" válida'
        )
        return
      }

      if (!attendee.events || !Array.isArray(attendee.events)) {
        console.error(
          'El objeto "attendee" no tiene un array válido de eventos'
        )
        return
      }
      if (attendee.events.includes(idEvento)) {
        const iconAsistir = document.querySelector('.iconAsistir')
        iconAsistir.addEventListener('click', () => eliminarEvento(idEvento))
        return
      }
      attendee.events.push(idEvento)
      localStorage.setItem('attendee', JSON.stringify(storedDataAtt))

      const objetoFinal = JSON.stringify({
        events: idEvento
      })

      const opciones = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: objetoFinal
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/attendees/add-event/${attendee._id}`,
        opciones
      )

      if (!res.ok) {
        const errorDetails = await res.text()
        console.error('Error en la respuesta:', errorDetails)
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const respuesta = await res.json()
    } else if (storedDataUs) {
      const { user } = storedDataUs
      if (!user || !user._id) {
        console.error('El objeto "user" no tiene una propiedad "_id" válida')
        return
      }

      if (!user.events || !Array.isArray(user.events)) {
        console.error('El objeto "user" no tiene un array válido de eventos')
        return
      }
      if (user.events.includes(idEvento)) {
        console.warn('El evento ya está añadido')
        return
      }

      user.events.push(idEvento)
      localStorage.setItem('user', JSON.stringify(storedDataUs))

      const objetoFinal = JSON.stringify({
        events: idEvento
      })

      const opciones = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: objetoFinal
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/users/add-event/${user._id}`,
        opciones
      )

      if (!res.ok) {
        const errorDetails = await res.text()
        console.error('Error en la respuesta:', errorDetails)
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const result = await res.json()
    } else {
      console.error('No se encontró ni "attendee" ni "user" en localStorage')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    hideSpinner()
  }
}

export const eliminarEvento = async (idEvento) => {
  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  if (storedDataAtt) {
    const { attendee } = storedDataAtt
    attendee.events = attendee.events.filter((evento) => evento !== idEvento)
    localStorage.setItem('attendee', JSON.stringify({ attendee }))
    const iconAsistir = document.querySelector('.iconAsistir')
    if (iconAsistir) {
      iconAsistir.innerHTML = ''
      const icon1 = document.createElement('img')
      icon1.src = '/public/assets/Icono asistir 1.png'
      iconAsistir.appendChild(icon1)
      iconAsistir.addEventListener('click', () => asistirEvento(idEvento))
    }

    try {
      showSpinner()
      const opciones = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const attendeeId = attendee._id
      const url = `http://localhost:3000/api/v1/attendees/${attendeeId}/delete/${idEvento}`

      const res = await fetch(url, opciones)
      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al eliminar evento: ${errorDetails}`)
      }

      const data = await res.json()
      console.log('Evento eliminado del array events del attendee:', data)

      return data
    } catch (error) {
      console.error('Error al eliminar evento:', error)
      throw new Error(`Error al eliminar evento: ${error.message}`)
    } finally {
      hideSpinner()
    }
  } else if (storedDataUs) {
    const { user } = storedDataUs
    user.events = user.events.filter((evento) => evento !== idEvento)
    localStorage.setItem('user', JSON.stringify({ user }))
    const iconAsistir = document.querySelector('.iconAsistir')
    if (iconAsistir) {
      iconAsistir.innerHTML = ''
      const icon1 = document.createElement('img')
      icon1.src = '/public/assets/Icono asistir 1.png'
      iconAsistir.appendChild(icon1)
      iconAsistir.addEventListener('click', () => asistirEvento(idEvento))
    }

    try {
      showSpinner()
      const opciones = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const userId = user._id
      const url = `http://localhost:3000/api/v1/users/${userId}/delete/${idEvento}`

      const res = await fetch(url, opciones)
      if (!res.ok) {
        const errorDetails = await res.text()
        throw new Error(`Error al eliminar evento: ${errorDetails}`)
      }

      const data = await res.json()
      console.log('Evento eliminado del array events del attendee:', data)

      return data
    } catch (error) {
      console.error('Error al eliminar evento:', error)
      throw new Error(`Error al eliminar evento: ${error.message}`)
    } finally {
      hideSpinner()
    }
  } else {
    if (!storedDataUs && !storedDataAtt) {
      console.error('No se encontró un objeto válido en localStorage')
      return
    }
  }
}
