import { IconAttendee1 } from '/src/components/IconAttendee/IconAttendee'
import {
  hideSpinner,
  showSpinner
} from '/src/components/SpinnerLoading/SpinnerLoading.js'
import { NoAttendEvent } from './NoAttendEvent'
import { API } from '/src/utils/API'

export const attendEvent = async (idEvento) => {
  try {
    showSpinner()
    const iconAsistir = document.querySelector('.iconAsistir')
    if (iconAsistir) {
      IconAttendee1(iconAsistir.parentElement, () => NoAttendEvent(idEvento))
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

    let userType = storedDataAtt ? 'attendee' : 'user'
    let user = storedDataAtt ? storedDataAtt.attendee : storedDataUs.user

    if (!user || !user._id) {
      console.error(
        `El objeto "${userType}" no tiene una propiedad "_id" válida`
      )
      return
    }

    if (!user.events || !Array.isArray(user.events)) {
      console.error(
        `El objeto "${userType}" no tiene un array válido de eventos`
      )
      return
    }

    user.events.push(idEvento)
    localStorage.setItem(userType, JSON.stringify({ [userType]: user }))

    const objetoFinal = { events: idEvento }

    const res = await API({
      endpoint: `${userType}s/add-event/${user._id}`,
      method: 'PUT',
      body: objetoFinal,
      token
    })

    if (res.status != 200) {
      throw new Error()
    }

    const respuesta = await res
  } catch (error) {
    console.error('Error:', error)
  } finally {
    hideSpinner()
  }
}
