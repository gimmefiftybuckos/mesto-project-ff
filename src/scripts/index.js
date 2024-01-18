import '../pages/index.css';
import {createTemplate, loadImage, createDeleteHandle, createLikeHandle} from './cards.js'
import {openModal, createImageHandler, closeModal, fillProfileInputs, changeProfile, changeAvatar, showSavingText, hideSavingText} from './modal.js'
import {enableValidation, clearValidation} from './validation.js'
import {getInitalCards, updateProfileData, loadProfileData, uploadNewCard, deleteCardData, increaseCounter, decreaseCounter, updateAvatarData, checkLink} from './api.js'
import {showGlobalErrorMessage} from './error.js'

const initialCards = await getInitalCards()
const userProfileData = await loadProfileData()

const cardTemplate = document.querySelector('#card-template').content 

const cardList = document.querySelector('.places__list')
const profile = document.querySelector('.profile')
const profileEditBtn = profile.querySelector('.profile__edit-button')
const addNewCardBtn = profile.querySelector('.profile__add-button')
const profileAvatar = profile.querySelector('.profile__image')
const profileName = profile.querySelector('.profile__title')
const profileDesc = profile.querySelector('.profile__description')

const popups = document.querySelectorAll('.popup')
const profileModal = document.querySelector('.popup_type_edit')
const newCardModal = document.querySelector('.popup_type_new-card')
const avatarModal = document.querySelector('.popup_type_avatar')
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
const newCardLinkInput = newCardModalForm.elements['card-link']

const avatarModalButton = avatarModal.querySelector('.button')
const avatarModalForm = document.forms['edit-avatar']
const avatarLinkInput = avatarModalForm.elements['avatar-link']

const errorWindow = document.querySelector('.error-message')
const errorMessage = errorWindow.querySelector('.error-message__text')

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorSelector: '.popup__input-error',
    inputErrorClass: 'popup__input_type_error',
    inputConfirmClass: 'popup__input_type_confirm',
    inputUrlClass: 'popup__input_type_url',
    errorClass: 'form__input-error_active'
}

const handleImageClick = createImageHandler(modalTypeImage, imageModal, descrModal)
const handleDelete = createDeleteHandle(deleteCardData)
const handleLike = createLikeHandle(increaseCounter, decreaseCounter, userProfileData)
const createCard = createTemplate(cardTemplate, handleDelete, handleLike, handleImageClick, userProfileData)

function loadProfile () {
    profileAvatar.style.backgroundImage = `url(${userProfileData.avatar})`
    profileName.textContent = userProfileData.name
    profileDesc.textContent = userProfileData.about
} 

loadProfile()

initialCards.forEach((card) => {
    cardList.append(createCard(card))
})

profileEditBtn.addEventListener('click', () => {
    openModal(profileModal)
    clearValidation(profileModalForm, validationConfig)
    enableValidation(profileModalForm, validationConfig)
    fillProfileInputs(profileNameInput, profileDescrInput, profileName, profileDesc)
})

addNewCardBtn.addEventListener('click', () => {
    openModal(newCardModal)
    clearValidation(newCardModalForm, validationConfig)
    enableValidation(newCardModalForm, validationConfig)
})

profileAvatar.addEventListener('click', () => {
    openModal(avatarModal)
    clearValidation(avatarModalForm, validationConfig)
    enableValidation(avatarModalForm, validationConfig)
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) {
            closeModal(popup)
        }
    })
})

profileModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    changeProfile(profileNameInput, profileDescrInput, profileName, profileDesc)
    updateProfileData(profileNameInput, profileDescrInput)
    closeModal(profileModal)
})

async function updateAvatar (link, event) {
    try {
        showSavingText(avatarModalButton)
        const checkingResponse = await checkLink(link)
        if (await checkingResponse) {
            updateAvatarData(link)
            changeAvatar(profileAvatar, link)
            closeModal(avatarModal)
        }
    } catch (error) {
        closeModal(avatarModal)
        setTimeout(() => showGlobalErrorMessage(errorWindow, errorMessage, link), 600)
        console.error(`Изображение по ссылке ${link} не найдено.`)
    } finally {
        hideSavingText(avatarModalButton)
        event.target.reset()
    }
}

avatarModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const link = avatarLinkInput.value
    updateAvatar (link, event)
})

async function addCard (name, link, event) {
    try {
        showSavingText(newCardModalButton)
        const checkingResponse = await checkLink(link)
        if (await checkingResponse) {
            const newCard = await uploadNewCard(name, link)
            const loadedImage = await loadImage (name, link, newCard['_id'])
            await cardList.prepend(createCard(loadedImage))
            await closeModal(newCardModal)
        }
    } catch (error) {
        closeModal(newCardModal)
        setTimeout(() => showGlobalErrorMessage(errorWindow, errorMessage, link), 600)
        console.error(`Изображение по ссылке ${link} не найдено.`)
    } finally {
        hideSavingText(newCardModalButton)
        event.target.reset()
    }
}

newCardModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = newCardNameInput.value
    const link = newCardLinkInput.value
    addCard(name, link, event)
})