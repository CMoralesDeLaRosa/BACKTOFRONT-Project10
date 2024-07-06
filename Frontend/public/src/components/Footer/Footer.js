import '/style.css'
import './Footer.css'

export const Footer = (nodoPadre) => {
  const footer = document.createElement('footer')
  footer.classList.add('footer', 'flex-container')

  const p = document.createElement('p')
  p.innerText = ' ¿Necesitas ayudas? | vivelaexperiencia@gmail.com | 7658767658'
  footer.appendChild(p)
  nodoPadre.appendChild(footer)
}
