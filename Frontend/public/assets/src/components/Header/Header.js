import '/style.css'
import './Header.css'
import { Home } from '../../pages/Home/Home'
import { routes } from '/public/src/utils/Data.js'
import { logOut } from '../../utils/LogOut'

export const Header = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  const sectionLogo = document.createElement('section')
  sectionLogo.classList.add('sectionLogo')
  const divLogo = document.createElement('div')
  const imgLogo = document.createElement('img')
  imgLogo.src = '/assets/Logo VLE.png'
  imgLogo.alt = 'Logo'
  const h2VLE = document.createElement('h2')
  h2VLE.innerText = 'Vive la experiencia'.toUpperCase()

  const sectionNav = document.createElement('section')
  sectionNav.classList.add('sectionNav')
  const nav = document.createElement('nav')
  nav.classList.add('navHeader')
  const ulNav = document.createElement('ul')

  const liHome = document.createElement('li')
  const aHome = document.createElement('a')
  aHome.classList.add('aNav')
  aHome.href = '#'
  aHome.textContent = 'Home'.toUpperCase()
  aHome.addEventListener('click', (event) => {
    event.preventDefault()
    const main = document.querySelector('main')
    main.innerHTML = ''
    Home(main)
  })
  liHome.appendChild(aHome)
  ulNav.appendChild(liHome)

  for (let i = 0; i < 2; i++) {
    const route = routes[i]
    const liNav = document.createElement('li')
    const aNav = document.createElement('a')
    aNav.href = '#'
    aNav.textContent = route.texto.toUpperCase()
    aNav.addEventListener('click', (event) => {
      event.preventDefault()
      const main = document.querySelector('main')
      main.innerHTML = ''
      route.funcion(main)
    })

    liNav.appendChild(aNav)
    ulNav.appendChild(liNav)
  }

  nav.appendChild(ulNav)
  sectionNav.appendChild(nav)
  divLogo.appendChild(imgLogo)
  sectionLogo.appendChild(divLogo)
  sectionLogo.appendChild(h2VLE)

  header.appendChild(sectionLogo)
  header.appendChild(sectionNav)
}
export const headerLogin = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''

  const sectionLogo = document.createElement('section')
  sectionLogo.classList.add('sectionLogo')
  const divLogo = document.createElement('div')
  const imgLogo = document.createElement('img')
  imgLogo.src = '/assets/Logo VLE.png'
  imgLogo.alt = 'Logo'
  const h2VLE = document.createElement('h2')
  h2VLE.innerText = 'Vive la experiencia'.toUpperCase()

  const sectionNav = document.createElement('section')
  sectionNav.classList.add('sectionNav')
  const nav = document.createElement('nav')
  nav.classList.add('navHeader')
  const ulNav = document.createElement('ul')

  const liHome = document.createElement('li')
  const aHome = document.createElement('a')
  aHome.classList.add('aNav')
  aHome.href = '#'
  aHome.textContent = 'Home'.toUpperCase()
  aHome.addEventListener('click', (event) => {
    event.preventDefault()
    const main = document.querySelector('main')
    main.innerHTML = ''
    Home(main)
  })
  liHome.appendChild(aHome)
  ulNav.appendChild(liHome)

  const routesToShow = [2, 3]

  routesToShow.forEach((index) => {
    const route = routes[index]
    const liNav = document.createElement('li')
    const aNav = document.createElement('a')
    aNav.classList.add('aNav')
    aNav.href = '#'
    aNav.textContent = route.texto.toUpperCase()
    aNav.addEventListener('click', (event) => {
      event.preventDefault()
      const main = document.querySelector('main')
      main.innerHTML = ''
      route.funcion(main)
    })

    liNav.appendChild(aNav)
    ulNav.appendChild(liNav)
  })

  const button = document.createElement('button')
  button.classList.add('buttonCerrarSesion')
  button.innerText = 'Cerrar Sesión'.toUpperCase()

  nav.appendChild(ulNav)
  nav.appendChild(button)
  sectionNav.appendChild(nav)
  divLogo.appendChild(imgLogo)
  sectionLogo.appendChild(divLogo)
  sectionLogo.appendChild(h2VLE)

  button.addEventListener('click', () => logOut())

  const storedDataUs = JSON.parse(localStorage.getItem('user'))
  if (storedDataUs && storedDataUs.user && storedDataUs.user.rol) {
    const { user } = storedDataUs
    const rol = user.rol
    if (rol === 'admin') {
      localStorage.setItem('admin', true)
      const adminRoute = routes.find((route) => route.texto === 'Admin')
      if (adminRoute) {
        const liNav = document.createElement('li')
        const aNav = document.createElement('a')
        aNav.classList.add('aNav')
        aNav.href = '#'
        aNav.textContent = adminRoute.texto.toUpperCase()
        aNav.addEventListener('click', (event) => {
          event.preventDefault()
          const main = document.querySelector('main')
          main.innerHTML = ''
          adminRoute.funcion(main)
        })

        liNav.appendChild(aNav)
        ulNav.appendChild(liNav)
      }
    }
  }

  header.appendChild(sectionLogo)
  header.appendChild(sectionNav)
}
