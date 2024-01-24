const WINDOW_SHOWING_TIMEOUT = 8000
const FADE_ANIMATION_TIMEOUT = 600

export function showGlobalErrorMessage (errorWindow, errorMessage, link) {
    errorMessage.textContent = `Изображение по ссылке ${link} не найдено.`
    errorWindow.classList.add('popup_is-animated')
    setTimeout(() => errorWindow.classList.add('popup_is-opened'), 0)
    const promise = new Promise(function(resolve) {
        setTimeout(() => {
            errorWindow.classList.remove('popup_is-opened')
            resolve()
        }, WINDOW_SHOWING_TIMEOUT)
    })
    promise.then(() => {
        setTimeout(() => {
            errorWindow.classList.remove('popup_is-animated')
            errorMessage.textContent = ''
        }, FADE_ANIMATION_TIMEOUT)
    })
}

export function createRecoverMessage(recoverWindow, recoverMessage, recoverForm, uploadCard) {
    return function (cardData) {
        recoverForm.addEventListener('submit', () => { // память утекает
            event.preventDefault()
            uploadCard(cardData.name, cardData.link) // код не асинхронный
            // append function
            recoverWindow.classList.remove('popup_is-opened')
        })
        recoverMessage.textContent = `Карточка ${cardData.name}` + ' была удалена. Восстановить?'
        recoverWindow.classList.add('popup_is-animated')
        setTimeout(() => recoverWindow.classList.add('popup_is-opened'), 0)
        const promise = new Promise(function(resolve) {
            setTimeout(() => {
                // recoverForm.removeEventListener('submit', recoverCard) // нужно прибрать за собой
                recoverWindow.classList.remove('popup_is-opened')
                resolve()
            }, WINDOW_SHOWING_TIMEOUT)
        })
        promise.then(() => {
            setTimeout(() => {
                recoverWindow.classList.remove('popup_is-animated')
                recoverMessage.textContent = ''
            }, FADE_ANIMATION_TIMEOUT)
        })
    }
}