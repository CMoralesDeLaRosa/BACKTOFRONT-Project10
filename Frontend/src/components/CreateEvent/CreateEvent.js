import '/style.css'
import './CreateEvent.css'
import { formCreateEvent } from '/src/utils/Data.js'
import { createForm } from '/src/components/Form/Form'
import { handleCreateEvent } from '/src/utils/CreateEvent'

export const createEvent = (nodoPadre) => {
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
