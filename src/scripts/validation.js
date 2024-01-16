function enableValidation (form) {
    const formList = Array.from(form.querySelectorAll('.popup__input'))
    formList.forEach((input) => {
        input.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        setEventListeners(form, input);
    })
}

function setEventListeners(form, input) {
    // toggleButtonState(form);

    input.addEventListener('input', function () {
        checkInputValidity(form, input);
        toggleButtonState(form)
        console.log(input)
    });
}

ValidityState.prototype.regularExpError = false

const checkInputValidity = (formElement, inputElement) => {
    // const letterRegExp = /[^a-zA-Zа-яА-ЯёЁ\s]/gi
    const letterRegExp = /^[a-zA-Zа-яёА-ЯЁ]+(?:[\s.-][a-zA-Zа-яёА-ЯЁ]+)*$/

    if (!inputElement.value.match(letterRegExp) && !inputElement.classList.contains('popup__input_type_url')) {
        console.log('ошибка')
        inputElement.validity.regularExpError = true
    } else {
        inputElement.validity.regularExpError = false
    }

    if (!inputElement.validity.valid || inputElement.validity.regularExpError) {
      showInputError(formElement, inputElement, inputElement.validationMessage || inputElement.dataset.errorMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error'); // для изменения цвета линии 
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
}

function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error'); // для изменения цвета линии 
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

function hasInvalidInput (inputList) {
    // console.log(inputElement.validity.valid)
    return inputList.some((inputElement) => {
        // console.log(inputElement.validity)
    return !inputElement.validity.valid || inputElement.validity.regularExpError;
  });
}

function toggleButtonState (form, param = false) {
    const buttonElement = form.querySelector('.button')
    if (hasInvalidInput(Array.from(form)) || param) {
        buttonElement.classList.add('popup__button_disabled');
        buttonElement.setAttribute('disabled', true)
        
  } else {
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.removeAttribute('disabled', true)
  }
}

function clearValidation (formElement) {
    const errorElements = Array.from(formElement.querySelectorAll('.popup__input-error'))
    errorElements.forEach((element) => {
        element.classList.remove('form__input-error_active')
        element.textContent = '';
    })
    toggleButtonState(formElement, true)
}
  
export {enableValidation, clearValidation}
