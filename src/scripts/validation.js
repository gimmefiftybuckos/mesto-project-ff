function enableValidation (form, validationConfig) {
    const formList = Array.from(form.querySelectorAll(validationConfig.inputSelector))

    formList.forEach((input) => {
        input.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        setEventListeners(form, input, validationConfig);
    })
}

function setEventListeners(form, input, validationConfig) {
    input.addEventListener('input', function () {
        checkInputValidity(form, input, validationConfig);
        toggleButtonState(form, validationConfig)
        console.log(input)
    });
}

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    const letterRegExp = /^[a-zA-Zа-яёА-ЯЁ]+(?:[\s.-][a-zA-Zа-яёА-ЯЁ]+)*$/

    if (!inputElement.value.match(letterRegExp) && !inputElement.classList.contains(validationConfig.inputUrlClass)) {
        console.log('ошибка')
        inputElement.validity.regularExpError = true
    } else {
        inputElement.validity.regularExpError = false
    }

    if (!inputElement.validity.valid || inputElement.validity.regularExpError) {
      showInputError(formElement, inputElement, inputElement.validationMessage || inputElement.dataset.errorMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig)
      inputElement.classList.add(validationConfig.inputConfirmClass)
    }
};

function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass); // для изменения цвета линии 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    // console.log('aaa')
    // console.log(validationConfig.inputErrorClass)
    inputElement.classList.remove(validationConfig.inputErrorClass); // для изменения цвета линии 
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = ''
}

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid || inputElement.validity.regularExpError;
  });
}

function toggleButtonState (form, validationConfig, param = false) {
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector)
    if (hasInvalidInput(Array.from(form)) || param) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true)
        
  } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true)
  }
}

function clearValidation (formElement, validationConfig) {
    const errorElements = Array.from(formElement.querySelectorAll(validationConfig.inputErrorSelector))
    const formList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
    formList.forEach((input) => {
        hideInputError(formElement, input, validationConfig)
        input.classList.remove(validationConfig.inputConfirmClass)
        input.value = ''
    })
    errorElements.forEach((element) => {
        element.classList.remove(validationConfig.errorClass)
        // console.log(validationConfig.errorClass)
        element.textContent = '';
    })
    toggleButtonState(formElement, validationConfig, true)
}
  
export {enableValidation, clearValidation}
