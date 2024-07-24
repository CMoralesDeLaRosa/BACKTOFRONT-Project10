import '/style.css'
import './BannerHello.css'

export const BannerHello = (nodoPadre) => {
  const articlePersonal = document.createElement('article')
  articlePersonal.classList.add('personalData')

  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))

  const p = document.createElement('p')
  const spanSaludo = document.createElement('span')
  spanSaludo.textContent = 'Hola '
  const spanNombre = document.createElement('span')
  spanNombre.classList.add('spanNombre')
  if (storedDataAtt) {
    const { attendee } = storedDataAtt
    spanNombre.textContent = attendee.name.toUpperCase()
  } else if (storedDataUs) {
    const { user } = storedDataUs
    spanNombre.textContent = user.name.toUpperCase()
  } else {
    console.error('No se encontró un objeto válido en localStorage')
    return
  }

  const spanMensaje = document.createElement('span')
  spanMensaje.textContent = ', descubre los nuevos eventos que tenemos hoy'
  spanSaludo.textContent = spanSaludo.textContent.toUpperCase()
  spanMensaje.textContent = spanMensaje.textContent.toUpperCase()
  p.appendChild(spanSaludo)
  p.appendChild(spanNombre)
  p.appendChild(spanMensaje)

  articlePersonal.appendChild(p)
  nodoPadre.appendChild(articlePersonal)
}
