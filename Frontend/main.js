import { Footer } from './public/src/components/Footer/Footer'
import { iniciarSesion } from './public/src/components/InicioSesion/InicioSesion'
import './style.css'

const divApp = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `<header></header><main></main>`
  Footer(app)
}

divApp()

iniciarSesion()
