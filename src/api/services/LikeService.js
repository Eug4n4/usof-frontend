import api from "../api"

class LikeService {
    static async getReactions(purpose, id) {
        if (purpose === "posts") {
            return api.get(`posts/${id}/like`);
        } else if (purpose === "comments") {
            return api.get(`comments/${id}/like`);
        }
        return Promise.reject();
    }

    static async toggleReaction(purpose, id, type) {
        if (purpose === "posts") {
            return api.post(`posts/${id}/like`, { type });
        } else if (purpose === "comments") {
            return api.post(`comments/${id}/like`, { type });
        }
        return Promise.reject()
    }

    static async deleteReaction(purpose, id) {
        if (purpose === "posts") {
            return api.delete(`posts/${id}/like`);
        } else if (purpose === "comments") {
            return api.post(`comments/${id}/like`);
        }
        return Promise.reject()
    }
}

export default LikeService