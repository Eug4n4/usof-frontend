import axios from "axios";


const api = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/`
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.code === "ERR_NETWORK") {
        return Promise.reject(error?.message);
    }
    const request = error.config;
    if (error.response.status === 401 && request.url !== "auth/refresh") {
        try {
            console.log("refreshing tokens")
            await api.get("auth/refresh");
            return api.request(request);
        } catch (e) {
            console.error(`Auth error: ${e}`)
            throw e;
        }
    }
    throw new Error(error.message)

})

export default api;