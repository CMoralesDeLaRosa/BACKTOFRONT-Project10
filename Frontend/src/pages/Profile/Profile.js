import '/style.css'
import './Profile.css'
import { createForm } from '/src/components/Form/Form'
import { formUpdateAttendees, formUpdateUsers } from '/src/utils/Data.js'
import { createButton } from '/src/components/Button/Button'
import { spanCheck } from '/src/components/SpanCheck/SpanCheck'
import { updateAttendee } from '/src/utils/UpdateAttendee'
import { updateUser } from '/src/utils/UpdateUser'

export const Profile = () => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'perfil')
  const mainNode = document.querySelector('main')
  mainNode.innerHTML = ''
  const sectionPerfil = document.createElement('section')
  sectionPerfil.classList.add('perfil', 'flex-container')
  mainNode.appendChild(sectionPerfil)

  const pPerfil = document.createElement('p')
  pPerfil.innerText = 'Aquí puedes cambiar los datos de tu cuenta'.toUpperCase()

  const articlePerfil = document.createElement('article')
  articlePerfil.classList.add('articlePerfil', 'flex-container')

  const divDatos = document.createElement('div')
  divDatos.classList.add('divDatos', 'flex-container')

  const p = document.createElement('p')
  p.innerText = 'Estos son los datos de tu cuenta'.toUpperCase()

  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))

  if (storedDataAtt) {
    const { attendee } = storedDataAtt
    const pName = document.createElement('p')
    const pEmail = document.createElement('p')

    pName.innerText = ('Nombre | ' + attendee.name).toUpperCase()
    pEmail.innerText = ('Email | ' + attendee.email).toUpperCase()

    divDatos.append(p, pName, pEmail)
    const buttonEliminar = createButton(
      divDatos,
      'sectionButton1',
      'Elimina tu perfil'
    )

    buttonEliminar.addEventListener('click', () => spanCheck(sectionPerfil))
    articlePerfil.append(divDatos)

    createForm(
      articlePerfil,
      '¿Qué datos quieres cambiar?',
      'Añade los datos que quieres modificar de tu perfil',
      formUpdateAttendees,
      'UpdateAttendees',
      updateAttendee
    )
  } else if (storedDataUs) {
    const { user } = storedDataUs
    const pName = document.createElement('p')
    const pEmail = document.createElement('p')
    const divImg = document.createElement('div')
    const img = document.createElement('img')

    pName.innerText = ('Nombre | ' + user.name).toUpperCase()
    pEmail.innerText = ('Email | ' + user.email).toUpperCase()
    img.src = user.img

    divImg.appendChild(img)
    divDatos.append(p, divImg, pName, pEmail)

    const buttonEliminar = createButton(
      divDatos,
      'sectionButton1',
      'Elimina tu perfil'
    )
    const sectionPerfil = document.querySelector('.perfil')
    buttonEliminar.addEventListener('click', () => spanCheck(sectionPerfil))
    articlePerfil.append(divDatos)

    createForm(
      articlePerfil,
      '¿Qué datos quieres cambiar?',
      'Añade los datos que quieres modificar de tu perfil',
      formUpdateUsers,
      'UpdateUsers',
      updateUser
    )
  }

  sectionPerfil.append(pPerfil, articlePerfil)
}
