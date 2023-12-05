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
}

function openingCycle(modal) {
    
    inAnimation = true

    modal.classList.add('popup_is-animated')
    setTimeout(() => modal.classList.add('popup_is-opened'), 0)
    setTimeout(() => {
        modal.classList.remove('popup_is-animated')
        inAnimation = false
    }, FADE_ANIMATION_TIMEOUT)

    modal.addEventListener('click', function toClose(event) {
        const target = event.target.classList
        if ((target.contains('popup__close') || target.contains('popup')) && inAnimation === false) {
            closeModal(modal)
            document.removeEventListener('keydown', toClose)
            modal.removeEventListener('click', toClose)
        }
    })

    document.addEventListener('keydown', function toClose(event) {
        if (event.code === 'Escape' && !inAnimation) {
            closeModal(modal)
            document.removeEventListener('keydown', toClose)
            modal.removeEventListener('click', toClose)
        }
    })
}

function openModalProfile(event, profileModal, newCardModal) {
    const target = event.target.classList
    if (target.contains('profile__edit-button') && !inAnimation) {
        openingCycle(profileModal)
    } else if (target.contains('profile__add-button') && !inAnimation) {
        openingCycle(newCardModal)
    }
}

function openModalImage(event, imageModal, modalTypeImage) {
    if (event.target.classList.contains('card__image') && !inAnimation) {
        const descrModal = modalTypeImage.querySelector('.popup__caption')
        imageModal.setAttribute('src', event.target.src)
        imageModal.setAttribute('alt', event.target.alt)
        descrModal.textContent = event.target.alt
        openingCycle(modalTypeImage)
    }
}

function submitButton(isFormValid, modalButton) {
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

function clearInputValue (nameInput, linkInput) {
    nameInput.value = ''
    linkInput.value = ''
}

function updateInputValue (nameInput, descriptionInput, name, description) {
    nameInput.value = name.textContent
    descriptionInput.value = description.textContent
}

function changeProfile (nameInput, descriptionInput, name, description) {
    name.textContent = nameInput.value  
    description.textContent = descriptionInput.value  
}

export {openModalProfile, openModalImage, closeModal, submitButton, clearInputValue, updateInputValue, changeProfile}