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