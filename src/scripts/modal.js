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

const closePopupByOverlay = evt => {
    if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) { 
            closeModal(evt.currentTarget) 
    }
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

export {openModal, closeModal, closePopupByOverlay}