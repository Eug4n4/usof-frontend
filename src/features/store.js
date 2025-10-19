import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./state/postSlice"
import categoryReducer from "./state/categorySlice"
export default configureStore({
    reducer: {
        posts: postReducer,
        categories: categoryReducer
    }
})