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

function createTemplate (cardTemplate, handleDelete, handleLike, handleImageClick) {
    
  return function (card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    const removeButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')
    const cardTitle = cardElement.querySelector('.card__title')

    cardTitle.textContent = card.name
    cardImage.setAttribute('src', card.link || card.src)
    cardImage.setAttribute('alt', `Фотография: ${card.name}`)  

    removeButton.addEventListener('click', (event) => {
      handleDelete(event)
    })
    likeButton.addEventListener('click', (event) => {
      handleLike(event)
    })
    cardImage.addEventListener('click', (event) => {
      handleImageClick(event)
    })
    
    return cardElement 
  }
} // 7.12 const с DOM перенес в index, в случае return cardElement.cloneNode(true) handler не вешается

function handleDelete (event) {
  let cardElement = event.target.closest('.card')
  cardElement.remove()
}

function handleLike (event) {
  event.target.classList.toggle('card__like-button_is-active')
}

function loadImage (name, link) {
  return new Promise ((resolve, reject) => {
    const image = document.createElement('img')

    image.src = link
    image.name = name
    
    image.onload = () => resolve(image)
    image.onerror = () => reject(link)
  })
}

export {createTemplate, loadImage, handleDelete, handleLike, initialCards}