import '/style.css'
import './UsersListAdmin.css'
import { createButton } from '../Button/Button'
import { hideSpinner, showSpinner } from '../SpinnerLoading/SpinnerLoading'
import { API } from '/public/src/utils/API'
import { spanCheckAtt, spanCheckUs } from '../SpanCheck/SpanCheck'

export const UsersListAdmin = async (nodoPadre) => {
  const articleUsers = document.createElement('article')
  articleUsers.classList.add('articleUsers')
  const titulo1 = document.createElement('h3')
  titulo1.innerText = 'USUARIOS REGISTRADOS'
  articleUsers.appendChild(titulo1)

  const articleAtt = document.createElement('article')
  articleAtt.classList.add('articleAtt')
  const titulo2 = document.createElement('h3')
  titulo2.innerText = 'ASISTENTES REGISTRADOS'
  articleAtt.appendChild(titulo2)

  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No estás autorizado. Token no encontrado.')
  }

  const storedDataAdmin = JSON.parse(localStorage.getItem('admin'))

  if (storedDataAdmin === true) {
    try {
      showSpinner()
      const { status, response } = await API({
        endpoint: `/users`,
        token
      })

      if (status !== 200) {
        throw new Error(`Error en la respuesta de la API: ${status}`)
      }

      const users = await response

      if (!users || users.length === 0) {
        const mensajeNoUsuarios = document.createElement('p')
        mensajeNoUsuarios.innerText = 'NO HAY USUARIOS REGISTRADOS.'
        articleUsers.appendChild(mensajeNoEventos)
      } else {
        const ulUsers = document.createElement('ul')
        ulUsers.classList.add('flex-container')
        articleUsers.appendChild(ulUsers)
        users.forEach((user) => {
          const liUser = document.createElement('li')
          const nameUser = document.createElement('p')
          const emailUser = document.createElement('p')
          nameUser.innerText = user.name
          emailUser.innerText = user.email

          liUser.append(nameUser, emailUser)
          const button = createButton(liUser, 'sectionButton3', 'Eliminar')
          button.addEventListener('click', () => spanCheckUs(user._id, liUser))

          ulUsers.appendChild(liUser)
        })
      }
    } catch (error) {
      console.error('Error al renderizar los usuarios:', error)
    } finally {
      hideSpinner()
    }

    try {
      showSpinner()

      const { status, response } = await API({
        endpoint: `/attendees`,
        token
      })

      if (status !== 200) {
        throw new Error(`Error en la respuesta de la API: ${status}`)
      }

      const attendees = await response

      if (!attendees || attendees.length === 0) {
        const mensajeNoAsistentes = document.createElement('p')
        mensajeNoAsistentes.innerText = 'NO HAY ASISTENTES REGISTRADOS.'
        articleAtt.appendChild(mensajeNoAsistentes)
      } else {
        const ulAtt = document.createElement('ul')
        ulAtt.classList.add('flex-container')
        articleAtt.appendChild(ulAtt)

        attendees.forEach((attendee) => {
          const liAtt = document.createElement('li')
          const nameAtt = document.createElement('p')
          const emailAtt = document.createElement('p')
          nameAtt.innerText = attendee.name
          emailAtt.innerText = attendee.email

          liAtt.append(nameAtt, emailAtt)
          const button = createButton(liAtt, 'sectionButton3', 'Eliminar')

          button.addEventListener('click', () =>
            spanCheckAtt(attendee._id, liAtt)
          )

          ulAtt.appendChild(liAtt)
        })
      }
    } catch (error) {
      console.error('Error al renderizar los asistentes:', error)
    } finally {
      hideSpinner()
    }
  } else {
    console.error('No se encontró un objeto válido en localStorage')
  }

  nodoPadre.append(articleUsers, articleAtt)
}
