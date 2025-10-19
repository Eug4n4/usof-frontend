import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./state/postSlice"
export default configureStore({
    reducer: {
        posts: postReducer
    }
})