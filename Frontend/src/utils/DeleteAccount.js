import { logOut } from './LogOut'
import { API } from '/src/utils/API'

export const deleteAccountAttendee = async () => {
  try {
    const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
    const storedDataUs = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (storedDataAtt) {
      const { attendee } = storedDataAtt

      const res = await API({
        endpoint: `attendees/${attendee._id}`,
        method: 'DELETE',
        token
      })

      if (res.status != 200) {
        throw new Error('Error en la eliminación del perfil')
      }

      const result = await res

      console.log('Perfil eliminado:', result)
      logOut()
    } else if (storedDataUs) {
      const { user } = storedDataUs

      const res = await API({
        endpoint: `users/${user._id}`,
        method: 'DELETE',
        token
      })

      if (res.status != 200) {
        throw new Error('Error en la eliminación del perfil')
      }

      const result = await res
      logOut()
    } else {
      console.error('No se encontró el objeto "attendee" en localStorage')
      return
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud de eliminación:', error)
  }
}
