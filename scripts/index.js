// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

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

for (card of initialCards) {
    cardList.append(createCard(card, removeCard)) // Передаю функцию callback в функцию создания карточки createCard 13:
}