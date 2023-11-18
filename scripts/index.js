// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list')

function addCard (card) {
    const cardTemplate = document.querySelector('#card-template').content 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const removeButton = cardElement.querySelector('.card__delete-button')

    cardElement.querySelector('.card__title').textContent = card.name
    cardImage.setAttribute('src', card.link)
    cardImage.setAttribute('alt', `Фотография: ${card.name}`)

    removeButton.addEventListener('click', removeCard)
    
    cardList.append(cardElement)
}

for (card of initialCards) {
    addCard(card)
}

function removeCard (event) {
    cardElement = event.target.closest('.card')
    cardElement.remove()
}