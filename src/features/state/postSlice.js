import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "../../api/services/PostService";
import { paginationReducers } from "./pagination";
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
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 5,
        query: ""
    },
    reducers: {
        set: (state, action) => {
            state.posts = action.payload
        },
        query: (state, action) => {
            state.query = action.payload;
        },
        ...paginationReducers
    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, state => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false
                state.posts = action.payload.data
                state.totalRecords = action.payload.total;
                state.totalPages = Math.ceil(action.payload.total / state.pageSize) || 1;
            })
            .addCase(getPosts.rejected, state => {
                state.loading = false;
            })
    }
})



export const { set, query, currentPage, pageSize } = postSlice.actions;
export default postSlice.reducer;