function createTemplate (cardTemplate, handleDelete, handleLike, handleImageClick, userProfileData) {
    
  return function (card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const removeButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')
    const likeCounter = cardElement.querySelector('.card__like-counter')
    const cardTitle = cardElement.querySelector('.card__title')

    cardTitle.textContent = card.name
    !card.owner ? card.owner = userProfileData : null

    if (card.owner['_id'] !== userProfileData['_id']) {
      removeButton.remove()
    }

    if (card.likes) {
      likeCounter.textContent = card.likes.length
      card.likes.find((item) => {
        item['_id'] === userProfileData['_id'] ? likeButton.classList.add('card__like-button_is-active') : null // Проверяем был ли ранее поставлен лайк и добавляем класс
      })
    } else {
      likeCounter.textContent = 0
    }

    cardImage.setAttribute('src', card.link || card.src)
    cardImage.setAttribute('alt', `Фотография: ${card.name}`)  
    cardElement.setAttribute('id', card['_id'] || card.id)  

    removeButton.addEventListener('click', handleDelete)
    likeButton.addEventListener('click', handleLike)
    cardImage.addEventListener('click', () => {
      handleImageClick(card.name, cardImage.src)
    })
    
    return cardElement 
  }
}

function createDeleteHandle (deleteCardData) {
  return function (event) {
    const cardElement = event.target.closest('.card')
    deleteCardData(cardElement)
    cardElement.remove()
  }
}

function createLikeHandle (increaseCounter, decreaseCounter, userData) {
  return function (event) {
    const cardElement = event.target.closest('.card')
    const likeCounter = cardElement.querySelector('.card__like-counter')
    if (!event.target.classList.contains('card__like-button_is-active')) {
      increaseCounter(cardElement, userData)
      likeCounter.textContent = parseInt(likeCounter.textContent) + 1
    } else {
      decreaseCounter(cardElement)
      likeCounter.textContent -= 1
    }
    event.target.classList.toggle('card__like-button_is-active')
  }
}

async function loadImage (name, link, id) {
  return await new Promise ((resolve, reject) => {
    const image = document.createElement('img')

    image.src = link
    image.name = name
    image.id = id // кажется, задавать id карточки в атрибутах не слишком правильно с точки зрения безопасности

    image.onload = () => resolve(image)
    image.onerror = () => reject(link)
  })
}

export {createTemplate, loadImage, createDeleteHandle, createLikeHandle}