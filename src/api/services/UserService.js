import api from "../api";

class UserService {
    static async updateAvatar(userId, data) {
        return api.patch(`users/${userId}/avatar`, data)
    }

    static async updateCredentials(userId, data) {
        return api.patch(`users/${userId}`, data);
    }

    static async getById(userId) {
        return api.get(`users/${userId}`)
    }
}

export default UserService;