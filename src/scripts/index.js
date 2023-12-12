import '../pages/index.css';
import {createTemplate, loadImage, handleDelete, handleLike, handleImageClick, initialCards} from './cards.js'
import {openModalProfile, openModalImage, closeModal, submitButton, clearInputValue, updateInputValue, changeProfile} from './modal.js'

const cardTemplate = document.querySelector('#card-template').content 

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

const createCard = createTemplate(cardTemplate, handleDelete, handleLike, handleImageClick)

initialCards.forEach((item) => {
    cardList.append(createCard(item))
})

profile.addEventListener('click', (event) => {
    openModalProfile(event, profileModal, newCardModal)
    clearInputValue(newCardNameInput, newCardLinkInput)
    updateInputValue(profileNameInput, profileDescrInput, profileName, profileDesc)
})

let isValid

profileModalForm.addEventListener('input', (event) => {
    if(profileNameInput.value.length >= 2 && profileDescrInput.value.length >= 2) {
        isValid = true
    } else {
        isValid = false
    }
    submitButton(isValid, profileModalButton)
})

profileModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    changeProfile(profileNameInput, profileDescrInput, profileName, profileDesc)
    closeModal(profileModal)
})

submitButton(isValid = false, newCardModalButton)
newCardModalForm.addEventListener('input', (event) => {
    if(newCardNameInput.value.length >= 2 && newCardLinkInput.value.length >= 2) {
        isValid = true
    } else {
        isValid = false
    }
    submitButton(isValid, newCardModalButton)
})

newCardModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const name = newCardNameInput.value
    const link = newCardLinkInput.value

    loadImage (name, link)
        .then((event) => {
            cardList.prepend(createCard(event, handleDelete))
            closeModal(newCardModal)
        })
        .catch((error) => {
            console.error(`Изображение по ссылке ${error} не найдено`)
        })
})