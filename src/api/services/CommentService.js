import api from "../api";

class CommentService {
    static async getById(id) {
        return api.get(`comments/${id}`);
    }

    static async updateStatus(commentId, newStatus) {
        return api.patch(`comments/${commentId}`, { active: newStatus })
    }
    static async deleteComment(id) {
        return api.delete(`comments/${id}`);
    }
}

export default CommentService;