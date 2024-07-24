import '/style.css'
import './Button.css'

export const createButton = (nodoPadre, etiqueta = '', texto = '') => {
  const button = document.createElement('button')
  if (etiqueta) {
    button.classList.add(etiqueta)
  }
  button.innerText = texto
  nodoPadre.appendChild(button)
  button.addEventListener('click', () => {})
  return button
}
