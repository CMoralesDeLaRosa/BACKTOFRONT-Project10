import {
  hideSpinner,
  showSpinner
} from '../components/SpinnerLoading/SpinnerLoading'
import { API } from '/public/src/utils/API'

export const handleCreateEvent = async (formData) => {
  const p1 = document.querySelector('.pError')
  if (p1) p1.remove()
  const p2 = document.querySelector('.pOK')
  if (p2) p2.remove()

  const token = localStorage.getItem('token')

  try {
    showSpinner()

    const res = await API({
      endpoint: 'events',
      method: 'POST',
      body: formData,
      token
    })

    console.log('res', res)

    if (res.status !== 201) {
      throw new Error()
    }

    const eventData = await res.response
    console.log('event', eventData)

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
    const pError = document.createElement('p')
    pError.classList.add('pError')
    pError.innerText =
      'Ocurrió un error al crear el evento. Por favor, inténtalo de nuevo.'
    const crearEvento = document.querySelector('.crearEvento')
    crearEvento.appendChild(pError)
  } finally {
    hideSpinner()
  }
}
