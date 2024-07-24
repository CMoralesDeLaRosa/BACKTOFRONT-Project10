import {
  hideSpinner,
  showSpinner
} from '../components/SpinnerLoading/SpinnerLoading'
import { API } from '/public/src/utils/API'

export const ValidateEvent = async (eventId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No estás autorizado. Token no encontrado.')
  }

  const storedDataAdmin = JSON.parse(localStorage.getItem('admin'))

  if (storedDataAdmin === true) {
    try {
      showSpinner()
      const res = await API({
        endpoint: `events/${eventId}`,
        method: 'PUT',
        token
      })

      if (res.status != 200) {
        const errorDetails = await res.text()
        throw new Error(`Error al validar el evento: ${errorDetails}`)
      }

      const respuesta = await res
    } catch (error) {
      console.error('Error al validar el evento:', error)
    } finally {
      hideSpinner()
    }
  }
}
