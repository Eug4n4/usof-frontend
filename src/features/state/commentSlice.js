import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paginationReducers } from "./pagination";
import { INITIAL_PAGE_SIZE } from "../constants";
import PostService from "../../api/services/PostService";

export const getPost = createAsyncThunk(
    "postComments/post",
    async (id, { rejectWithValue }) => {
        try {
            if (!isNaN(id)) {
                const response = await PostService.getById(id)
                return response.data
            }
            return rejectWithValue(id)
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const getPostComments = createAsyncThunk(
    'postComments/fetch',
    async (query, { getState, rejectWithValue }) => {
        try {
            let response;
            if (typeof query === 'number' && !isNaN(query)) {
                response = await PostService.getComments(query)
            } else {
                const { postComments } = getState()
                console.log(postComments)
                response = await PostService.getComments(postComments.post.id, query);
            }
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const postCommentSlice = createSlice({
    name: "postComments",
    initialState: {
        post: {},
        comments: [],
        commentsLoading: true,
        postLoading: true,
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: INITIAL_PAGE_SIZE,
        query: ""
    },
    reducers: {
        set: (state, action) => {
            state.comments = action.payload
        },
        query: (state, action) => {
            state.query = action.payload;
        },
        ...paginationReducers
    },
    extraReducers: builder => {
        builder
            .addCase(getPostComments.pending, state => {
                state.commentsLoading = true;
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false
                state.comments = action.payload.data
                state.totalRecords = action.payload.total;
                state.totalPages = Math.ceil(action.payload.total / state.pageSize) || 1;
            })
            .addCase(getPostComments.rejected, state => {
                state.commentsLoading = false;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, state => {
                state.postLoading = false;
            })
    }
})

export const { query, currentPage, pageSize, setPostId } = postCommentSlice.actions;
export default postCommentSlice.reducer