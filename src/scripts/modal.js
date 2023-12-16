let inAnimation = false
const FADE_ANIMATION_TIMEOUT = 600

function closeModal(modalWindow) {
    inAnimation = true 
    modalWindow.classList.add('popup_is-animated')
    modalWindow.classList.remove('popup_is-opened')
    setTimeout(() => {
        modalWindow.classList.remove('popup_is-animated')
        inAnimation = false 
    }, FADE_ANIMATION_TIMEOUT)

    document.removeEventListener('keydown', handleEscape)
}

function openModal(modal) {
    inAnimation = true

    modal.classList.add('popup_is-animated')
    setTimeout(() => modal.classList.add('popup_is-opened'), 0)
    setTimeout(() => {
        modal.classList.remove('popup_is-animated')
        inAnimation = false
    }, FADE_ANIMATION_TIMEOUT)

    document.addEventListener('keydown', handleEscape)
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened') 
      closeModal(openedPopup)
    }
}

function createImageHandler(modalTypeImage, imageModal, descrModal) {
    return function (cardTitle, cardImage) {
        descrModal.textContent = cardTitle.alt
        imageModal.setAttribute('src', cardImage.src)
        imageModal.setAttribute('alt', cardImage.alt)
        openModal(modalTypeImage)
    }
}

function validateSubmitButton(isFormValid, modalButton) {
    if (isFormValid) {
        modalButton.removeAttribute('disabled')
        modalButton.classList.remove('popup__button_disabled')
        modalButton.classList.add('popup__button')
    } else {
        modalButton.setAttribute('disabled', true)
        modalButton.classList.add('popup__button_disabled')
        modalButton.classList.remove('popup__button')
    }
}

function fillProfileInputs (nameInput, descriptionInput, name, description) {
    nameInput.value = name.textContent
    descriptionInput.value = description.textContent
}

function changeProfile (nameInput, descriptionInput, name, description) {
    name.textContent = nameInput.value  
    description.textContent = descriptionInput.value  
}

export {openModal, createImageHandler, closeModal, validateSubmitButton, fillProfileInputs, changeProfile}