import '/style.css'
import './ValidateEventsAdmin.css'
import { DeleteEvent } from '/src/utils/DeleteEvent'
import { ValidateEvent } from '/src/utils/ValidateEventAdmin'
import { createButton } from '/src/components/Button/Button'
import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading'
import { API } from '/src/utils/API'

export const ValidateEventsAdmin = async (nodoPadre) => {
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
      const { status, response } = await API({
        endpoint: `events/not-verified`,
        token
      })

      if (status !== 200) {
        throw new Error(`Error en la respuesta de la API: ${status}`)
      }

      const events = await response

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
          await ValidateEvent(event._id)
          divEventVal.remove()
        })
        buttonCancel.addEventListener('click', async () => {
          await DeleteEvent(event._id)
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
