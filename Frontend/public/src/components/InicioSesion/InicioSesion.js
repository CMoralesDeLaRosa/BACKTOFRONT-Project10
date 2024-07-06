import { Home } from '../../pages/Home/Home'
import { Admin } from '../../pages/Admin/Admin'
import { EventoInfo } from '../../pages/EventoInfo/EventoInfo'
import { Eventos } from '../../pages/Eventos/Eventos'
import { Login } from '../../pages/Login/Login'
import { Perfil } from '../../pages/Perfil/Perfil'
import { Register } from '../../pages/Register/Register'
import { Header, headerLogin } from '../Header/Header'

export const iniciarSesion = () => {
  const attendee = JSON.parse(localStorage.getItem('attendee'))
  const user = JSON.parse(localStorage.getItem('user'))

  if (attendee) {
    cargarSesion()
  } else if (user) {
    cargarSesion()
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

export const cargarSesion = () => {
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
          Eventos(main)
        } else if (paginaActual === 'perfil') {
          Perfil(main)
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
