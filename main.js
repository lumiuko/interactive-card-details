import IMask from 'imask'

const cardName = document.getElementById('card-name')
const cardNumber = document.getElementById('card-number')
const expirationMonth = document.getElementById('exp-month')
const expirationYear = document.getElementById('exp-year')
const cvc = document.getElementById('cvc')
const boundInputs = document.querySelectorAll('[data-bind]')
const form = document.getElementById('form')
const successMessage = document.getElementById('success-message')

IMask(cardName, { mask: /[A-Za-z]+/ })
IMask(cardNumber, { mask: '0000 0000 0000 0000' })
IMask(expirationMonth, { mask: '00' })
IMask(expirationYear, { mask: '00' })
IMask(cvc, { mask: '000' })

const validations = [
  {
    element: cardName,
    pattern: /^[A-Za-z]+ [A-Za-z]+$/
  },
  {
    element: cardNumber,
    pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/
  },
  {
    element: expirationMonth,
    pattern: /^(0[1-9]|1[0-2])$/
  },
  {
    element: expirationYear,
    pattern: /^([2-9]\d|\d{3})$/
  },
  {
    element: cvc,
    pattern: /^\d{3}$/
  }
]

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

function toggleClass(element, className, condition) {
  if (condition) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}

function handleChange(event) {
  const input = event.target
  const boundElement = document.getElementById(input.dataset.bind)
  boundElement.textContent = input.value.length !== 0 ? input.value : input.dataset.default
}

async function handleSubmit(event) {
  event.preventDefault()
  let isValidationError = false

  validations.forEach(item => {
    const parentElement = item.element.closest('.input-group')
    const isMatch = item.element.value.match(item.pattern)
    isValidationError = !isMatch
    toggleClass(item.element, 'input-error', !isMatch)
    toggleClass(parentElement, 'group-error', !isMatch)
  })

  if (isValidationError) return
  form.classList.add('invisible')

  await wait(200)
  form.classList.add('hidden')
  successMessage.classList.remove('hidden')
  await wait(200)
  successMessage.classList.remove('invisible')
}

boundInputs.forEach(item => item.addEventListener('input', handleChange))
form.addEventListener('submit', handleSubmit)
