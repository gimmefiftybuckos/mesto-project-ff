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
    } else {
      removeButton.addEventListener('click', handleDelete)
    }

    if (card.likes) {
      likeCounter.textContent = card.likes.length
      if (card.likes.some(item => item['_id'] === userProfileData['_id'])) {
        likeButton.classList.add('card__like-button_is-active')
      }
    } else {
      likeCounter.textContent = 0
    }

    cardImage.setAttribute('src', card.link || card.src)
    cardImage.setAttribute('alt', `Фотография: ${card.name}`)  
    cardElement.setAttribute('id', card['_id'] || card.id)  

    likeButton.addEventListener('click', handleLike)
    cardImage.addEventListener('click', () => {
      handleImageClick(card.name, cardImage.src)
    })
    
    return cardElement 
  }
}

function createDeleteHandle (deleteCardData, getInitalCards, showRecoverMessage) {
  return async function (event) {
    const cardElement = event.target.closest('.card')
    const initialCards = await getInitalCards()
    
    await deleteCardData(cardElement)
    await cardElement.remove() // нужно попробовать скрыть карточку от пользователя, если он не нажал на кнопку 'восстановить' - удаляем карточку
    // const cardData = await getCardData(initialCards, cardElement) // функция находит элемент при нужном условии, но не возвращает результат
    await initialCards.forEach(obj => {
      if (obj['_id'] === cardElement.id) {
        showRecoverMessage(obj)
      }
    })
  }
}

// async function getCardData(initialCards, cardElement) {
//   initialCards.forEach(obj => {
//     if (obj['_id'] === cardElement.id) {
//       console.log(obj)
//       return obj
//     }
//   })
// }

function createLikeHandle (increaseCounter, decreaseCounter) {
  return async function (event) {
    const cardElement = event.target.closest('.card')
    const likeCounter = cardElement.querySelector('.card__like-counter')
    if (!event.target.classList.contains('card__like-button_is-active')) {
      const cardDataResponse = await increaseCounter(cardElement)
      .catch((err) => console.log(err))
      likeCounter.textContent = await cardDataResponse.likes.length
    } else {
      const cardDataResponse = await decreaseCounter(cardElement)
      .catch((err) => console.log(err))
      likeCounter.textContent = await cardDataResponse.likes.length
    }
    event.target.classList.toggle('card__like-button_is-active')
  }
}

async function loadImage (name, link, id) {
  return await new Promise ((resolve, reject) => {
    const image = document.createElement('img')

    image.src = link
    image.name = name
    image.id = id

    image.onload = () => resolve(image)
    image.onerror = () => reject(link)
  })
}

export {createTemplate, loadImage, createDeleteHandle, createLikeHandle}