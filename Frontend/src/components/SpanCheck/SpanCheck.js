import '/style.css'
import './SpanCheck.css'
import { createButton } from '/src/components/Button/Button'
import {
  deleteAccountAdUs,
  deleteAcountAdAtt
} from '/src/utils/DeleteAccountAdmin'
import { deleteAccountAttendee } from '/src/utils/DeleteAccount'

export const spanCheck = (nodoPadre) => {
  const divSpanUs = document.createElement('div')
  divSpanUs.classList.add('spanComprobar', 'flex-container')

  const p = document.createElement('p')
  p.innerText =
    '¿Estás seguro que quieres eliminar tu perfil?\nEsta acción no se puede deshacer '

  const divButtons = document.createElement('div')

  const buttonSi = createButton(divButtons, 'sectionButton2', 'Sí')
  const buttonNo = createButton(divButtons, 'sectionButton2', 'No')

  buttonSi.addEventListener('click', () => {
    deleteAccountAttendee()
  })
  buttonNo.addEventListener('click', () => {
    divSpanUs.remove()
  })

  divSpanUs.append(p, divButtons)
  nodoPadre.appendChild(divSpanUs)
}

export const spanCheckUs = (userId, liUser) => {
  const divSpanUs = document.createElement('div')
  divSpanUs.classList.add('spanComprobarUs', 'flex-container')

  const p = document.createElement('p')
  p.classList.add('pUs')
  p.innerText =
    '¿Estás seguro que quieres eliminar este usuario?\nEsta acción no se puede deshacer '

  const divButtons = document.createElement('div')

  const buttonSi = createButton(divButtons, 'sectionButton2', 'Sí')
  const buttonNo = createButton(divButtons, 'sectionButton2', 'No')

  buttonSi.addEventListener('click', () => {
    deleteAccountAdUs(userId)
    divSpanUs.remove()
    liUser.remove()
  })
  buttonNo.addEventListener('click', () => {
    divSpanUs.remove()
  })

  divSpanUs.append(p, divButtons)
  const articleUsers = document.querySelector('.articleUsers')
  articleUsers.appendChild(divSpanUs)
}

export const spanCheckAtt = (attendeeId, liAtt) => {
  const divSpanAtt = document.createElement('div')
  divSpanAtt.classList.add('spanComprobarAtt', 'flex-container')

  const p = document.createElement('p')
  p.innerText =
    '¿Estás seguro que quieres eliminar este asistente?\nEsta acción no se puede deshacer '

  const divButtons = document.createElement('div')

  const buttonSi = createButton(divButtons, 'sectionButton2', 'Sí')
  const buttonNo = createButton(divButtons, 'sectionButton2', 'No')

  buttonSi.addEventListener('click', () => {
    deleteAcountAdAtt(attendeeId)
    divSpanAtt.remove()
    liAtt.remove()
  })
  buttonNo.addEventListener('click', () => {
    divSpanAtt.remove()
  })

  divSpanAtt.append(p, divButtons)
  const articleAtt = document.querySelector('.articleAtt')
  articleAtt.appendChild(divSpanAtt)
}
