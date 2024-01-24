function enableValidation (validationConfig) {
    const formList = document.querySelectorAll(validationConfig.formSelector)
    formList.forEach((form) => {
        const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
        setEventListeners(form, inputList, validationConfig)
    })
}

function setEventListeners(form, inputList, validationConfig) {
    console.log(form, inputList)
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, validationConfig)
            toggleButtonState(form, validationConfig)
        })
        input.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
    }) 
}

const checkInputValidity = (formElement, inputElement, validationConfig) => { // но ведь при таком раскладе любой понимающий в код пользователь может просто стереть pattern и ввести все что вздумается
    if (inputElement.validity.patternMismatch) { 
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
      } else { 
        inputElement.setCustomValidity("")
      } 
      if (!inputElement.validity.valid) { 
        showInputError( 
          formElement, 
          inputElement, 
          inputElement.validationMessage, 
          validationConfig 
        )
      } else { 
        hideInputError(formElement, inputElement, validationConfig)
        inputElement.classList.add(validationConfig.inputConfirmClass)
      } 
}

function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(validationConfig.inputErrorClass) // для изменения цвета линии 
    inputElement.classList.remove(validationConfig.inputConfirmClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(validationConfig.errorClass)
}

function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(validationConfig.inputErrorClass) // для изменения цвета линии 
    inputElement.classList.remove(validationConfig.inputConfirmClass)
    errorElement.classList.remove(validationConfig.errorClass)
    errorElement.textContent = ''
}

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState (form, validationConfig, param = false) {
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector)
    if (param || hasInvalidInput(Array.from(form))) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass)
        buttonElement.setAttribute('disabled', true)
        
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass)
        buttonElement.removeAttribute('disabled', true)
    }
}

function clearValidation (formElement, validationConfig) {
    const errorElements = Array.from(formElement.querySelectorAll(validationConfig.inputErrorSelector))
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
    inputList.forEach((input) => {
        hideInputError(formElement, input, validationConfig)
    })
    errorElements.forEach((element) => {
        element.classList.remove(validationConfig.errorClass)
        element.textContent = ''
    })
    toggleButtonState(formElement, validationConfig, true)
}
  
export {enableValidation, clearValidation}
