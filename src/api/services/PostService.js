import api from "../api";

class PostService {
    static async get(query) {
        if (query) {
            return api.get(`/posts?${query}`)
        } else {
            return api.get('/posts')
        }

    }
}

export default PostService