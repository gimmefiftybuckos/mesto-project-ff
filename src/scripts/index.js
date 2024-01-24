import '../pages/index.css';
import {createTemplate, loadImage, createDeleteHandle, createLikeHandle} from './cards.js'
import {openModal, closeModal, closePopupByOverlay} from './modal.js'
import {enableValidation, clearValidation} from './validation.js'
import {getInitalCards, updateProfileData, loadProfileData, uploadCard, deleteCardData, increaseCounter, decreaseCounter, updateAvatarData, checkLink} from './api.js'
import {showGlobalErrorMessage, createRecoverMessage} from './message.js'

const initialCards = await getInitalCards() 
.catch((err) => console.log(err))
const userProfileData = await loadProfileData()
.catch((err) => console.log(err))

Promise.all([initialCards, userProfileData])
.catch((err) => console.log(err))

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

const recoverWindow = document.querySelector('.recover-message')
const recoverMessage = recoverWindow.querySelector('.recover-message__text')
const recoverForm = recoverWindow.querySelector('.recover-message__form')

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorSelector: '.popup__input-error',
    inputErrorClass: 'popup__input_type_error',
    inputConfirmClass: 'popup__input_type_confirm',
    inputUrlClass: 'popup__input_type_url',
    errorClass: 'form__input-error_active'
}

const showRecoverMessage = createRecoverMessage(recoverWindow, recoverMessage, recoverForm, uploadCard)
const handleImageClick = createImageHandler(modalTypeImage, imageModal, descrModal)
const handleDelete = createDeleteHandle(deleteCardData, getInitalCards, showRecoverMessage, uploadCard)
const handleLike = createLikeHandle(increaseCounter, decreaseCounter)
const createCard = createTemplate(cardTemplate, handleDelete, handleLike, handleImageClick, userProfileData)

function loadProfile () {
    profileAvatar.style.backgroundImage = `url(${userProfileData.avatar})`
    profileName.textContent = userProfileData.name
    profileDesc.textContent = userProfileData.about
} 

loadProfile()
enableValidation(validationConfig)

initialCards.forEach((card) => {
    cardList.append(createCard(card))
})

profileEditBtn.addEventListener('click', () => {
    openModal(profileModal)
    clearValidation(profileModalForm, validationConfig)
    fillProfileInputs(profileNameInput, profileDescrInput, profileName, profileDesc)
})

addNewCardBtn.addEventListener('click', () => {
    openModal(newCardModal)
    clearValidation(newCardModalForm, validationConfig)
})

profileAvatar.addEventListener('click', () => {
    openModal(avatarModal)
    clearValidation(avatarModalForm, validationConfig)
})

profileModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    changeProfile(profileNameInput, profileDescrInput, profileName, profileDesc)
    updateProfileData(profileNameInput, profileDescrInput)
    closeModal(profileModal)
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', closePopupByOverlay)
})

function createImageHandler(modalTypeImage, imageModal, descrModal) {
    return function (name, imageLink) {
        descrModal.textContent = name
        imageModal.setAttribute('src', imageLink)
        openModal(modalTypeImage)
    }
}

async function updateAvatar (link, event) {
    try {
        showSavingText(avatarModalButton)
        const checkingResponse = await checkLink(link)
        .catch((err) => console.log(err))
        if (await checkingResponse) {
            updateAvatarData(link)
            changeAvatar(profileAvatar, link)
        }
    } catch (error) {
        setTimeout(() => showGlobalErrorMessage(errorWindow, errorMessage, link), 600)
        console.error(`Изображение по ссылке ${link} не найдено.`)
    } finally {
        hideSavingText(avatarModalButton)
        closeModal(avatarModal)
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
        await console.log(await checkingResponse)
        if (await checkingResponse) { 
            const newCard = await uploadCard(name, link) 
            const loadedImage = await loadImage (name, link, newCard['_id']) 
            await cardList.prepend(createCard(loadedImage)) 
        } 
    } catch (error) { 
        setTimeout(() => showGlobalErrorMessage(errorWindow, errorMessage, link), 600) 
        console.error(`Изображение по ссылке ${link} не найдено.`) 
    } finally { 
        hideSavingText(newCardModalButton) 
        closeModal(newCardModal) 
        event.target.reset() 
    } 
} 

newCardModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = newCardNameInput.value
    const link = newCardLinkInput.value
    addCard(name, link, event)
})

function fillProfileInputs (nameInput, descriptionInput, name, description) {
    nameInput.value = name.textContent
    descriptionInput.value = description.textContent
}

function changeProfile (nameInput, descriptionInput, name, description) {
    name.textContent = nameInput.value  
    description.textContent = descriptionInput.value  
}

function changeAvatar (profileAvatar, link) {
    profileAvatar.style.backgroundImage = `url(${link})`
}

function showSavingText (button) {
    button.textContent = 'Сохранение...'
}

function hideSavingText (button) {
    button.textContent = 'Сохранить'
}