import '/style.css'
import { createButton } from '../Button/Button'

export const createForm = (
  nodoPadre,
  h3,
  info = '',
  fields,
  etiqueta = '',
  onSubmitCallback
) => {
  const formContainer = document.createElement('article')
  formContainer.classList.add('formContainer', 'flex-container')
  if (etiqueta) {
    formContainer.classList.add(etiqueta)
  }
  const artInfo = document.createElement('article')
  artInfo.classList.add('flex-container', 'artInfo')
  const artForm = document.createElement('article')
  artForm.classList.add('flex-container', 'artForm')

  const titleForm = document.createElement('h3')
  const textForm = document.createElement('p')

  titleForm.innerText = h3.toUpperCase()
  textForm.innerText = info

  const form = document.createElement('form')
  form.classList.add('form')
  form.setAttribute('enctype', 'multipart/form-data')

  for (const field of fields) {
    const divForm = document.createElement('div')
    divForm.classList.add('divForm')
    const label = document.createElement('label')
    label.setAttribute('for', field.id)
    label.innerText = field.label

    const input = document.createElement('input')
    input.type = field.type
    input.id = field.id
    input.name = field.name
    input.placeholder = field.placeholder

    divForm.appendChild(label)
    divForm.appendChild(input)
    form.appendChild(divForm)
  }

  artForm.appendChild(form)
  const submitButton = createButton(form)
  submitButton.type = 'submit'
  submitButton.innerText = 'Enviar'
  artInfo.appendChild(titleForm)
  artInfo.appendChild(textForm)
  formContainer.appendChild(artInfo)
  formContainer.appendChild(artForm)
  nodoPadre.appendChild(formContainer)

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    onSubmitCallback(formData)
  })
}
