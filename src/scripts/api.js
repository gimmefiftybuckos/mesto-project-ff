async function getInitalCards() {
    try {
        const res = await fetch('https://nomoreparties.co/v1/wff-cohort-4/cards', {
        method: 'GET',
        headers: {
            authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27'
        },
        })
        return await res.json()
    } catch (err) {
        console.error(err)
    }
}

async function updateProfileData(name, description) {
    try {
        await fetch('https://nomoreparties.co/v1/wff-cohort-4/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
                'Content-Type': 'application/json'
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
        const res = await fetch('https://nomoreparties.co/v1/wff-cohort-4/users/me', {
            method: 'GET',
            headers: {
                authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
                // 'Content-Type': 'application/json'
            },
        })
        // await console.log(await res.json())
        return await res.json()
    } catch (err) {
        console.error(err)
    } 
}

async function uploadNewCard(name, link) {
    try {
        const res = await fetch('https://nomoreparties.co/v1/wff-cohort-4/cards', {
            method: 'POST',
            headers: {
                authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        // await console.log(await res.json())
        return await res.json()
    } catch (err) {
        console.error(err)
    } 
}

// function uploadNewCard(name, link) {
//     fetch('https://nomoreparties.co/v1/wff-cohort-4/cards', {
//         method: 'POST',
//         headers: {
//             authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: name,
//             link: link
//         })
//     })
//     .then(res => res.json())
//     .then((res) => {
//         return res['_id']
//     })
// }

async function deleteCardData(cardId) {
    try {
        await fetch(`https://nomoreparties.co/v1/wff-cohort-4/cards/${cardId.id}`, {
            method: 'DELETE',
            headers: {
                authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
                
            }
        })
    } catch (err) {
        console.error(err)
    } 
}

async function increaseCounter(cardId, user) {
    try {
        const res = await fetch(`https://nomoreparties.co/v1/wff-cohort-4/cards/likes/${cardId.id}`, {
            method: 'PUT',
            headers: {
                authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user
            })
        })
        return await res.json()
    } catch (err) {
        console.error(err)
    } 
}

async function decreaseCounter(cardId) {
    try {
        const res = await fetch(`https://nomoreparties.co/v1/wff-cohort-4/cards/likes/${cardId.id}`, {
            method: 'DELETE',
            headers: {
                authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
            }
        })
        // await console.log(await res.json())
        // return await res.json()
    } catch (err) {
        console.error(err)
    } 
}

async function updateAvatarData(avatarUrl) {
    try {
        await fetch('https://nomoreparties.co/v1/wff-cohort-4/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '69d961c7-c84a-4106-920e-afcfe18d0f27',
                'Content-Type': 'application/json'
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



