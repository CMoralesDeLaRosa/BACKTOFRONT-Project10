import '/style.css'
import './SpinnerLoading.css'

export const showSpinner = () => {
  const imgSpinner = document.createElement('img')
  imgSpinner.src = '/public/assets/Spinner.png'
  imgSpinner.id = 'spinner'

  const main = document.querySelector('main')
  main.appendChild(imgSpinner)

  imgSpinner.style.display = 'block'
}

export const hideSpinner = () => {
  const imgSpinner = document.getElementById('spinner')
  if (imgSpinner) {
    imgSpinner.style.display = 'none'
    imgSpinner.remove()
  }
}
