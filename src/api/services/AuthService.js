import api from "../api";
class AuthService {
    static async login(data) {
        return api.post("auth/login", data);
    }

    static async register(data) {
        return api.post("auth/register", data);
    }

    static async refresh() {
        return api.get("auth/refresh");
    }
    static async logout() {
        return api.post("auth/logout");
    }
}

export default AuthService;