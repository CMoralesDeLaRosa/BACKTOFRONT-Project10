import { Header, headerLogin } from '../components/Header/Header'
import { Events } from '../pages/Events/Events'
import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { Profile } from '../pages/Profile/Profile'
import { Register } from '../pages/Register/Register'
import { Admin } from '/public/src/pages/Admin/Admin'

export const startSession = () => {
  const attendee = JSON.parse(localStorage.getItem('attendee'))
  const user = JSON.parse(localStorage.getItem('user'))

  if (attendee) {
    loadSession()
  } else if (user) {
    loadSession()
  } else {
    const paginaActual = sessionStorage.getItem('paginaActual')
    if (!paginaActual) {
      Header()
      const mainNode = document.querySelector('main')
      Home(mainNode)
    } else {
      Header()
      const main = document.querySelector('main')
      main.innerHTML = ''
      if (paginaActual === 'login') {
        Login(main)
      } else if (paginaActual === 'register') {
        Register(main)
      } else if (paginaActual === 'home') Home(main)
    }
  }
  return
}

export const loadSession = () => {
  const storedDataAtt = JSON.parse(localStorage.getItem('attendee'))
  const storedDataUs = JSON.parse(localStorage.getItem('user'))

  if (storedDataAtt || storedDataUs) {
    const main = document.querySelector('main')
    main.innerHTML = ''
    headerLogin(main)

    const paginaActual = sessionStorage.getItem('paginaActual')
    if (paginaActual) {
      const main = document.querySelector('main')
      main.innerHTML = ''

      let parsedPaginaActual
      try {
        parsedPaginaActual = JSON.parse(paginaActual)
      } catch (e) {
        parsedPaginaActual = null
      }

      if (parsedPaginaActual && parsedPaginaActual.type === 'evento') {
        EventoInfo(parsedPaginaActual.evento)
      } else {
        if (paginaActual === 'eventos') {
          Events(main)
        } else if (paginaActual === 'perfil') {
          Profile(main)
        } else if (paginaActual === 'home') {
          Home(main)
        } else if (paginaActual === 'admin') {
          Admin(main)
        }
      }
    }

    if (!paginaActual) {
      const main = document.querySelector('main')
      main.innerHTML = ''
      Home(main)
      sessionStorage.setItem('paginaActual', 'home')
    }
  }
}
