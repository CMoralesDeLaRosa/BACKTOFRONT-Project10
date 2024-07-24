import { Footer } from './public/src/components/Footer/Footer'
import { startSession } from './public/src/utils/StartSession'
import './style.css'

const divApp = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `<header></header><main></main>`
  Footer(app)
}

divApp()

startSession()
