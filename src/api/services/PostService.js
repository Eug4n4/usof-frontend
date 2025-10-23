import api from "../api";

class PostService {
    static async get(query) {
        if (query) {
            return api.get(`/posts?${query}`)
        } else {
            return api.get('/posts')
        }

    }

    static async getById(id) {
        return api.get(`posts/${id}`);
    }

    static async getComments(id, query) {
        if (query) {
            return api.get(`posts/${id}/comments?${query}`);
        }
        return api.get(`posts/${id}/comments`)
    }
}

export default PostService