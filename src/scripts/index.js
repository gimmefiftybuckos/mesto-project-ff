import '../pages/index.css';
import {createCard, loadImage, cardEvent, initialCards} from './cards.js'
import {modalProfileOpen, modalImageOpen, modalClose, submitButton, clearInputValue, updateInputValue, changeProfile} from './modal.js'

const cardList = document.querySelector('.places__list')
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')
const profileDesc = profile.querySelector('.profile__description')

const profileModal = document.querySelector('.popup_type_edit')
const newCardModal = document.querySelector('.popup_type_new-card')
const modalTypeImage = document.querySelector('.popup_type_image')
const imageModal = modalTypeImage.querySelector('.popup__image')

const profileModalButton = profileModal.querySelector('.button')
const profileModalForm = document.forms['edit-profile']
const profileNameInput = profileModalForm.elements.name
const profileDescrInput = profileModalForm.elements.description

const newCardModalButton = newCardModal.querySelector('.button')
const newCardModalForm = document.forms['new-place']
const newCardNameInput = newCardModalForm.elements['place-name']
const newCardLinkInput = newCardModalForm.elements.link


initialCards.forEach((item) => {
    cardList.append(createCard(item, cardEvent))
})

profile.addEventListener('click', (event) => {
    modalProfileOpen(event, profileModal, newCardModal)
    clearInputValue(newCardNameInput, newCardLinkInput)
    updateInputValue(profileNameInput, profileDescrInput, profileName, profileDesc)
})

cardList.addEventListener('click', (event) => {
    modalImageOpen(event, imageModal, modalTypeImage)
})

let isValid

profileModalForm.addEventListener('input', (event) => {
    if(profileNameInput.value.length > 2 && profileDescrInput.value.length > 2) {
        isValid = true
    } else {
        isValid = false
    }
    submitButton(isValid, profileModalButton)
})

profileModalButton.addEventListener('click', (event) => {
    event.preventDefault()
    changeProfile(profileNameInput, profileDescrInput, profileName, profileDesc)
})

submitButton(isValid = false, newCardModalButton)
newCardModalForm.addEventListener('input', (event) => {
    if(newCardNameInput.value.length > 2 && newCardLinkInput.value.length > 2) {
        isValid = true
    } else {
        isValid = false
    }
    submitButton(isValid, newCardModalButton)
})

newCardModalButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    let name = newCardNameInput.value
    let link = newCardLinkInput.value

    modalClose(newCardModal)

    loadImage (name, link)
        .then((event) => {
            cardList.prepend(createCard(event, cardEvent))
        })
        .catch((error) => {
            console.error(`Изображение по ссылке ${error} не найдено`)
        })
})