const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardList = document.querySelector('.places__list')

function createCard (card, callbackRemove) {
    const cardTemplate = document.querySelector('#card-template').content 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const removeButton = cardElement.querySelector('.card__delete-button')

    cardElement.querySelector('.card__title').textContent = card.name
    cardImage.setAttribute('src', card.link)
    cardImage.setAttribute('alt', `Фотография: ${card.name}`)

    removeButton.addEventListener('click', callbackRemove)
    
    return cardElement
}

function removeCard (event) {
    cardElement = event.target.closest('.card')
    cardElement.remove()
}

initialCards.forEach((item) => {
  cardList.append(createCard(item, removeCard)) // Передаю функцию callback в функцию создания карточки createCard
})

// export default initialCards