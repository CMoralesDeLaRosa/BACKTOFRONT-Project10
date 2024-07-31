import { Header, headerLogin } from '/src/components/Header/Header'
import { Events } from '/src/pages/Events/Events'
import { Home } from '/src/pages/Home/Home'
import { Login } from '/src/pages/Login/Login'
import { Profile } from '/src/pages/Profile/Profile'
import { Register } from '/src/pages/Register/Register'
import { Admin } from '/src/pages/Admin/Admin'

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
