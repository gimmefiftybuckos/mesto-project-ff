import '../pages/index.css';
import {createTemplate, loadImage, handleDelete, handleLike, initialCards} from './cards.js'
import {openModal, createImageHandler, closeModal, submitButton, fillProfileInputs, changeProfile} from './modal.js'

const cardTemplate = document.querySelector('#card-template').content 

const cardList = document.querySelector('.places__list')
const profile = document.querySelector('.profile')
const profileEditBtn = profile.querySelector('.profile__edit-button')
const addNewCardBtn = profile.querySelector('.profile__add-button')
const profileName = profile.querySelector('.profile__title')
const profileDesc = profile.querySelector('.profile__description')

const popups = document.querySelectorAll('.popup')
const profileModal = document.querySelector('.popup_type_edit')
const newCardModal = document.querySelector('.popup_type_new-card')
const modalTypeImage = document.querySelector('.popup_type_image')
const imageModal = modalTypeImage.querySelector('.popup__image')
const descrModal = modalTypeImage.querySelector('.popup__caption')

const profileModalButton = profileModal.querySelector('.button')
const profileModalForm = document.forms['edit-profile']
const profileNameInput = profileModalForm.elements.name
const profileDescrInput = profileModalForm.elements.description

const newCardModalButton = newCardModal.querySelector('.button')
const newCardModalForm = document.forms['new-place']
const newCardNameInput = newCardModalForm.elements['place-name']
const newCardLinkInput = newCardModalForm.elements.link

const handleImageClick = createImageHandler(modalTypeImage, imageModal, descrModal)
const createCard = createTemplate(cardTemplate, handleDelete, handleLike, handleImageClick)

initialCards.forEach((item) => {
    cardList.append(createCard(item))
})

profileEditBtn.addEventListener('click', () => {
    openModal(profileModal)
    fillProfileInputs(profileNameInput, profileDescrInput, profileName, profileDesc)
})

addNewCardBtn.addEventListener('click', () => {
    openModal(newCardModal)
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_is-opened')) {
            closeModal(popup)
        }
        if (event.target.classList.contains('popup__close')) {
            closeModal(popup)
        }
    })
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
        .finally(() => {
            evt.target.reset()
        })
})