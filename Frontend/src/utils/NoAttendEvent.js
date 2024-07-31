import { IconAttendee2 } from '/src/components/IconAttendee/IconAttendee'
import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading'
import { attendEvent } from './AttendEvent'
import { API } from '/src/utils/API'

export const NoAttendEvent = async (idEvento) => {
  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  if (storedDataAtt) {
    const { attendee } = storedDataAtt
    attendee.events = attendee.events.filter((evento) => evento !== idEvento)
    localStorage.setItem('attendee', JSON.stringify({ attendee }))
    const iconAsistir = document.querySelector('.iconAsistir')
    if (iconAsistir) {
      IconAttendee2(iconAsistir.parentElement, () => attendEvent(idEvento))
    }

    try {
      showSpinner()
      const attendeeId = attendee._id

      const response = await API({
        endpoint: `attendees/${attendeeId}/delete/${idEvento}`,
        method: 'DELETE',
        token
      })

      if (response.status != 200) {
        throw new Error(`Error al eliminar evento: ${error.message}`)
      }

      const data = await response

      return data
    } catch (error) {
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
      IconAsistir2(iconAsistir.parentElement, () => attendEvent(idEvento))
    }

    try {
      showSpinner()
      const userId = user._id

      const { status, response } = await API({
        endpoint: `users/${userId}/delete/${idEvento}`,
        method: 'DELETE',
        token
      })

      if (status != 200) {
        throw new Error(`Error al eliminar evento: ${error.message}`)
      }

      const data = await response

      return data
    } catch (error) {
      console.error('Error al eliminar evento:', error)
      throw new Error(`Error al eliminar evento: ${error.message}`)
    } finally {
      hideSpinner()
    }
  } else {
    console.error('No se encontró un objeto válido en localStorage')
    return
  }
}
