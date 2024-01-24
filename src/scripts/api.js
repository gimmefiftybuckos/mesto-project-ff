const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
    'Content-Type': 'application/json'
  }
}

async function handleResponse(res) {
    if (res.ok) {
        return await res.json()
    } 
    return await Promise.reject(`Ошибка: ${res.status}`)
}

async function getInitalCards() { 
    const res = await fetch(`${config.baseUrl}/cards`, { 
    method: 'GET', 
    headers: { 
        authorization: config.headers.authorization 
    }, 
    }) 
    return await handleResponse(res)
}

async function updateProfileData(name, description) {
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
}

async function loadProfileData() {
    const res = await fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization,
        },
    })
    return await handleResponse(res)
}

async function uploadCard(name, link) {
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
    return await handleResponse(res)
}

async function deleteCardData(card) {
    await fetch(`${config.baseUrl}/cards/${card.id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,   
        }
    })
}

async function increaseCounter(card) {
    const res = await fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': config.headers['Content-Type']
        },
    })
    return await handleResponse(res)
}

async function decreaseCounter(card) {
    const res = await fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    })
    return await handleResponse(res)
}

async function updateAvatarData(avatarUrl) {
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
}

async function checkLink (url) { 
    try { 
        const res = await fetch(`${url}`, { 
            method: 'GET', 
        }) 
        if (await res.ok) { 
            return true 
        } 
    } catch (err) { 
        Promise.reject(res.status) 
        console.error(err) 
        return false 
    }  
} 

export {getInitalCards, updateProfileData, loadProfileData, uploadCard, deleteCardData, increaseCounter, decreaseCounter, updateAvatarData, checkLink}



