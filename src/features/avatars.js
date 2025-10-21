
function getUserAvatar(avatarURL) {
    return `${import.meta.env.VITE_BACKEND_BASE_URL}/${avatarURL}`
}


export default getUserAvatar