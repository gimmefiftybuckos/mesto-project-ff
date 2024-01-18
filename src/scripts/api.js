const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
    'Content-Type': 'application/json'
  }
}

async function getInitalCards() {
    try {
        const res = await fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization
        },
        })
        if (res.ok) {
            return await res.json()
        }
    } catch (err) {
        console.error(err)
    }
}

async function updateProfileData(name, description) {
    try {
        await fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                name: name.value,
                about: description.value
            })
        })
    } catch (err) {
        console.error(err)
    } 
}

async function loadProfileData() {
    try {
        const res = await fetch(`${config.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: config.headers.authorization,
            },
        })
        if (res.ok) {
            return await res.json()
        }
    } catch (err) {
        console.error(err)
    } 
}

async function uploadNewCard(name, link) {
    try {
        const res = await fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        if (res.ok) {
            return await res.json()
        }
    } catch (err) {
        console.error(err)
    } 
}

async function deleteCardData(cardId) {
    try {
        await fetch(`${config.baseUrl}/cards/${cardId.id}`, {
            method: 'DELETE',
            headers: {
                authorization: config.headers.authorization,
                
            }
        })
    } catch (err) {
        console.error(err)
    } 
}

async function increaseCounter(cardId, user) {
    try {
        await fetch(`${config.baseUrl}/cards/likes/${cardId.id}`, {
            method: 'PUT',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                user: user
            })
        })
    } catch (err) {
        console.error(err)
    } 
}

async function decreaseCounter(cardId) {
    try {
        await fetch(`${config.baseUrl}/cards/likes/${cardId.id}`, {
            method: 'DELETE',
            headers: {
                authorization: config.headers.authorization,
            }
        })
    } catch (err) {
        console.error(err)
    } 
}

async function updateAvatarData(avatarUrl) {
    try {
        await fetch(`${config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
            },
            body: JSON.stringify({
                avatar: avatarUrl
            })
        })
    } catch (err) {
        console.error(err)
    } 
}

async function checkLink (avatarUrl) {
    try {
        const res = await fetch(`${avatarUrl}`, {
            method: 'GET',
        })
        if (res.ok) {
            return true
        }
    } catch (err) {
        Promise.reject(res.status)
        console.error(err)
        return false
    } 
}

export {getInitalCards, updateProfileData, loadProfileData, uploadNewCard, deleteCardData, increaseCounter, decreaseCounter, updateAvatarData, checkLink}



