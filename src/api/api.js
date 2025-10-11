import axios from "axios";


const api = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/`
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.code === "ERR_NETWORK") {
        return Promise.reject();
    }
    const request = error.config;

    request._isRetry = true;
    if (error.response.status >= 400 && error.response.status < 500 && error.config && !error.config._isRetry) {
        try {
            await api.get("auth/refresh");
            return api.request(request);
        } catch (e) {
            console.error(`Auth error: ${e}`)
        }
    }

})

export default api;