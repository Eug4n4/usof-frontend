import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "../../api/services/PostService";
export const getPosts = createAsyncThunk(
    'posts/fetch',
    async (query, { rejectWithValue }) => {
        try {
            const response = await PostService.get(query)
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: true,
        query: ""
    },
    reducers: {
        set: (state, action) => {
            state.posts = action.payload
        },
        query: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, state => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false
                state.posts = action.payload.data;
            })
            .addCase(getPosts.rejected, state => {
                state.loading = false;
            })
    }
})



export const { set, query } = postSlice.actions;
export default postSlice.reducer;