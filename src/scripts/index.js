import '../pages/index.css';
import {createTemplate, loadImage, createDeleteHandle, createLikeHandle} from './cards.js'
import {openModal, createImageHandler, closeModal, fillProfileInputs, changeProfile, changeAvatar} from './modal.js'
import {enableValidation, clearValidation} from './validation.js'
import {getInitalCards, updateProfileData, loadProfileData, uploadNewCard, deleteCardData, increaseCounter, decreaseCounter, updateAvatarData} from './api.js'

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
console.log(profileAvatar)

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
    fillProfileInputs(profileNameInput, profileDescrInput, profileName, profileDesc)
    clearValidation(profileModalForm)
    enableValidation(profileModalForm)
})

addNewCardBtn.addEventListener('click', () => {
    openModal(newCardModal)
    enableValidation(newCardModalForm)
})

profileAvatar.addEventListener('click', () => {
    openModal(avatarModal)
    clearValidation(avatarModalForm)
    enableValidation(avatarModalForm)
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

profileModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    changeProfile(profileNameInput, profileDescrInput, profileName, profileDesc)
    updateProfileData(profileNameInput, profileDescrInput)
    closeModal(profileModal)
})

avatarModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const link = avatarLinkInput.value
    updateAvatarData(link)
    changeAvatar(profileAvatar, link)
    closeModal(avatarModal)
    event.target.reset()
})

async function addCard (name, link, event) {
    try {
        const newCard = await uploadNewCard(name, link)
        const loadedImage = await loadImage (name, link, newCard['_id'])
        await cardList.prepend(createCard(loadedImage))
        await closeModal(newCardModal)
    } catch (err) {
        console.error(`Изображение по ссылке не найдено. Ошибка ${error}`)
    } finally {
        event.target.reset()
    }
}

newCardModalForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = newCardNameInput.value
    const link = newCardLinkInput.value
    addCard(name, link, event)
})