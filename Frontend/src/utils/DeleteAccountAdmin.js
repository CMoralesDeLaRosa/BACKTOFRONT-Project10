import { API } from '/src/utils/API'

export const deleteAccountAdUs = async (userId) => {
  try {
    const token = localStorage.getItem('token')

    const res = await API({
      endpoint: `users/admin/${userId}`,
      method: 'DELETE',
      token
    })

    if (res.status != 200) {
      throw new Error('Error en la eliminación del perfil')
    }

    const result = await res

    if (result) {
      const pEliminado = document.querySelector('.pEliminado')
      if (pEliminado) {
        pEliminado.remove()
      }
      const p = document.createElement('p')
      p.classList.add('pEliminado')
      p.innerText = 'Se ha eliminado el usuario correctamente'
      const articleUsers = document.querySelector('.articleUsers')
      articleUsers.appendChild(p)
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud de eliminación:', error)
  }
}

export const deleteAcountAdAtt = async (attendeeId) => {
  try {
    const token = localStorage.getItem('token')

    const res = await API({
      endpoint: `attendees/admin/${attendeeId}`,
      method: 'DELETE',
      token
    })

    if (res.status != 200) {
      throw new Error('Error en la eliminación del perfil')
    }

    const result = await res

    if (result) {
      const pEliminado = document.querySelector('.pEliminado')
      if (pEliminado) {
        pEliminado.remove()
      }
      const p = document.createElement('p')
      p.classList.add('pEliminado')
      p.innerText = 'Se ha eliminado el asistente correctamente'
      const articleAtt = document.querySelector('.articleAtt ')
      articleAtt.appendChild(p)
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud de eliminación:', error)
  }
}
