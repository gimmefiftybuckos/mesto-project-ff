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

function createCard (card, cardEvent) {
  const cardTemplate = document.querySelector('#card-template').content 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')

  cardElement.querySelector('.card__title').textContent = card.name
  cardImage.setAttribute('src', card.link)
  cardImage.setAttribute('alt', `Фотография: ${card.name}`)

  cardElement.addEventListener('click', cardEvent)

  return cardElement
}

function cardEvent (event) {
  if (event.target.classList.contains('card__delete-button')) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
  } else if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active')
  }
}

function loadImage (name, link) {
  return new Promise ((resolve, reject) => {
    const image = {}
    image.name = name
    image.link = link
    image.onerror = reject
    image.onload = resolve
    console.log(image)
    return image
  })
}

export {createCard, loadImage, cardEvent, initialCards}