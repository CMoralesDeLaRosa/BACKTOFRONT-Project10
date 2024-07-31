import '/style.css'
import './Events.css'
import { EventInfo } from '/src/pages/EventInfo/EventInfo'
import { BannerHello } from '/src/components/BannerHello/BannerHello'
import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading'
import { API } from '/src/utils/API'
import { myEvents } from '/src/components/MyEvents/MyEvents'
import { createEvent } from '/src/components/CreateEvent/CreateEvent'
import { DeleteEvent } from '/src/utils/DeleteEvent'

export const getEvents = (eventos, nodoPadre) => {
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
    buttonMas.addEventListener('click', () => EventInfo(evento))

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
          await DeleteEvent(evento._id)
          divEvento.remove()
        })
      }
    }

    divEvento.append(divImg, divInfo)
    nodoPadre.appendChild(divEvento)
  })
}

export const Events = async (nodoPadre) => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'eventos')
  const sectionEventos = document.createElement('section')
  sectionEventos.classList.add('sectionEventos')
  nodoPadre.appendChild(sectionEventos)
  BannerHello(sectionEventos)

  const storedDataUs = JSON.parse(localStorage.getItem('user'))
  if (storedDataUs) {
    const sectionEventos = document.querySelector('.sectionEventos')
    createEvent(sectionEventos)
    myEvents()
  } else {
    myEvents()
  }

  try {
    showSpinner()
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No estás autorizado. Token no encontrado.')
    }

    const { status, response } = await API({ endpoint: '/events', token })

    if (status !== 200) {
      throw new Error(`Error en la respuesta de la API: ${status}`)
    }

    const eventos = response

    const articleEventos = document.createElement('article')
    articleEventos.classList.add('articleEventos')
    getEvents(eventos, articleEventos)

    sectionEventos.appendChild(articleEventos)
  } catch (error) {
    console.error('Error al obtener eventos:', error)
  } finally {
    hideSpinner()
  }
}
