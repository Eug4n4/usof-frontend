import api from "../api";

class UserService {
    static async updateAvatar(userId, data) {
        return api.patch(`users/${userId}/avatar`, data)
    }
}

export default UserService;