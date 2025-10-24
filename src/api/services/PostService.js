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

    static async getUserPosts(query) {
        if (query) {
            return api.get(`users/posts?${query}`);
        }
        return api.get(`users/posts`)
    }

    static async getUserFavoritePosts(query) {
        if (query) {
            return api.get(`users/favorites?${query}`);
        }
        return api.get(`users/favorites`)
    }

    static async createComment(postId, data) {
        return api.post(`posts/${postId}/comment`, data)
    }

    static async createPost({ title, content, categories = [] }) {
        return api.post(`posts`, { title, content, categories })
    }
}

export default PostService