import { Header } from '../components/Header/Header'
import { Home } from '../pages/Home/Home'

export const logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('attendee')
  localStorage.removeItem('user')
  localStorage.removeItem('admin')
  sessionStorage.removeItem('paginaActual')
  const header = document.querySelector('header')
  header.innerHTML = ''
  Header()
  const mainNode = document.querySelector('main')
  mainNode.innerHTML = ''
  Home(mainNode)
}
