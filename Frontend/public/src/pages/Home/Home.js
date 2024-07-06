import '/style.css'
import './Home.css'
import { parrafosHome } from '../../components/Data/Data'

export const Home = async (nodoPadre) => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'home')
  const sectionHome = document.createElement('section')
  sectionHome.classList.add('sectionHome')

  const artImgHome = document.createElement('article')
  const artInfoHome = document.createElement('article')
  artInfoHome.classList.add('flex-container')

  const divImgsHome = document.createElement('div')
  divImgsHome.classList.add('carrusel')

  try {
    const res = await fetch('http://localhost:3000/api/v1/events')
    const eventos = await res.json()

    const imagenesEventos = eventos.map((evento) => evento.img)

    imagenesEventos.forEach((imagen, index) => {
      const imgElement = document.createElement('img')
      imgElement.src = imagen
      imgElement.classList.add('carrusel-img')
      imgElement.style.opacity = '0'
      divImgsHome.appendChild(imgElement)

      if (index === 0) {
        imgElement.style.opacity = '1'
      }
    })

    let currentIndex = 0
    const images = divImgsHome.querySelectorAll('.carrusel-img')

    const showNextImage = () => {
      images[currentIndex].style.opacity = '0'
      currentIndex = (currentIndex + 1) % images.length
      images[currentIndex].style.opacity = '1'
    }

    setInterval(showNextImage, 4000)
  } catch (error) {
    console.error('Error al obtener las imágenes de los eventos:', error)
  }

  const icon1 = document.createElement('img')
  icon1.src = '/public/assets/Icono asistir 2.png'

  icon1.addEventListener('click', () => {
    icon1.classList.add('girando')
    setTimeout(() => {
      icon1.classList.remove('girando')
    }, 1000)
  })
  artInfoHome.appendChild(icon1)
  for (const parrafo of parrafosHome) {
    const pHome = document.createElement('p')
    pHome.innerText = parrafo.toUpperCase()
    artInfoHome.appendChild(pHome)
  }
  const icon2 = document.createElement('img')
  icon2.src = '/public/assets/Icono asistir 1.png'
  icon2.addEventListener('click', () => {
    icon2.classList.add('girando2')
    setTimeout(() => {
      icon2.classList.remove('girando2')
    }, 1000)
  })
  artInfoHome.appendChild(icon2)

  artImgHome.appendChild(divImgsHome)
  sectionHome.appendChild(artImgHome)
  sectionHome.appendChild(artInfoHome)
  nodoPadre.appendChild(sectionHome)
}
