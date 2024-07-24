import '/style.css'
import './Admin.css'
import { UsersListAdmin } from '/public/src/components/UsersListAdmin/UsersListAdmin'
import { ValidateEventsAdmin } from '/public/src/components/ValidateEventsAdmin/ValidateEventsAdmin'

export const Admin = async () => {
  sessionStorage.removeItem('paginaActual')
  sessionStorage.setItem('paginaActual', 'admin')

  const sectionAdmin = document.createElement('section')
  sectionAdmin.classList.add('sectionAdmin', 'flex-direction')

  UsersListAdmin(sectionAdmin)
  ValidateEventsAdmin(sectionAdmin)

  const main = document.querySelector('main')
  main.appendChild(sectionAdmin)
}
