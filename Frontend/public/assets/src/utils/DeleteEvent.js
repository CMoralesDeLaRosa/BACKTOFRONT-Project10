import {
  hideSpinner,
  showSpinner
} from '../components/SpinnerLoading/SpinnerLoading'
import { API } from '/public/src/utils/API'

export const DeleteEvent = async (eventId) => {
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
        method: 'DELETE',
        token
      })

      if (res.status !== 200) {
        throw new Error('Error en la eliminación del evento')
      }

      const result = await res
    } catch (error) {
      console.error('Error al eliminar evento:', error)
      throw new Error(`Error al eliminar evento: ${error.message}`)
    } finally {
      hideSpinner()
    }
  } else {
    console.error(
      'No se encontró el objeto "admin" en localStorage o no es true'
    )
  }
}
