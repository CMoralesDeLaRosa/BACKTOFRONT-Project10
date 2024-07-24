export const IconAttendee1 = (nodoPadre, event) => {
  let divIcon = nodoPadre.querySelector('.iconAsistir')
  if (!divIcon) {
    divIcon = document.createElement('div')
    divIcon.classList.add('iconAsistir')
    nodoPadre.appendChild(divIcon)
  }

  let icon = divIcon.querySelector('img')
  if (!icon) {
    icon = document.createElement('img')
    divIcon.appendChild(icon)
  }

  icon.src = '/assets/Icono asistir 2.png'
  divIcon.replaceWith(divIcon.cloneNode(true))
  divIcon = nodoPadre.querySelector('.iconAsistir')
  divIcon.addEventListener('click', event)
}

export const IconAttendee2 = (nodoPadre, event) => {
  let divIcon = nodoPadre.querySelector('.iconAsistir')
  if (!divIcon) {
    divIcon = document.createElement('div')
    divIcon.classList.add('iconAsistir')
    nodoPadre.appendChild(divIcon)
  }

  let icon = divIcon.querySelector('img')
  if (!icon) {
    icon = document.createElement('img')
    divIcon.appendChild(icon)
  }

  icon.src = '/assets/Icono asistir 1.png'
  divIcon.replaceWith(divIcon.cloneNode(true))
  divIcon = nodoPadre.querySelector('.iconAsistir')
  divIcon.addEventListener('click', event)
}
