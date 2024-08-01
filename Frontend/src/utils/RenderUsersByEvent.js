import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading'
import { API } from '/src/utils/API'

export const renderAttendeesUsersByEvent = async (evento) => {
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

    if (storedDataAtt || storedDataUs) {
      const { status, response } = await API({
        endpoint: `events/attendees/${evento._id}`,
        token
      })

      if (status !== 200) {
        const pNoAsistentes = document.createElement('p')
        pNoAsistentes.innerText =
          'Este evento no tiene ningún asistente todavía'.toUpperCase()
        articleEventoAtt.appendChild(pNoAsistentes)
        throw new Error('Error al obtener los asistentes y usuarios')
      }

      const data = response

      const ulAtt = document.createElement('ul')

      data.forEach((item) => {
        const liAtt = document.createElement('li')
        liAtt.innerText = `${item.name}`.toUpperCase()
        ulAtt.appendChild(liAtt)
      })

      articleEventoAtt.appendChild(ulAtt)
    } else {
      return
    }
  } catch (error) {
    console.error('Error en renderAttendeesUsersByEvent:', error)
  } finally {
    hideSpinner()
  }
}
