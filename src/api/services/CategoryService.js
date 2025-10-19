import api from "../api";

class CategoryService {
    static async get(query) {
        if (query) {
            return api.get(`categories?${query}`)
        } else {
            return api.get('categories');
        }
    }
}

export default CategoryService