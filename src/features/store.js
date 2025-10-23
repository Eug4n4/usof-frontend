import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./state/postSlice"
import categoryReducer from "./state/categorySlice"
import postCommentsReducer from "./state/commentSlice"
export default configureStore({
    reducer: {
        posts: postReducer,
        categories: categoryReducer,
        postComments: postCommentsReducer
    }
})