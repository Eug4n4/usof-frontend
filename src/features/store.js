import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./state/postSlice"
import categoryReducer from "./state/categorySlice"
import postCommentsReducer from "./state/commentSlice"
import { profileReducer } from "./state/profileSlice"
import { favoriteReducer } from "./state/favoriteSlice"
import reactionReducer from "./state/reactionSlice"
export default configureStore({
    reducer: {
        posts: postReducer,
        categories: categoryReducer,
        postComments: postCommentsReducer,
        profile: profileReducer,
        favorite: favoriteReducer,
        reactions: reactionReducer
    }
})