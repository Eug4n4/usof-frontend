import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "../../api/services/PostService";
import { paginationReducers } from "./pagination";
import { INITIAL_PAGE_SIZE } from "../constants";

export const getPosts = createAsyncThunk(
    'profile/posts',
    async (query, { rejectWithValue }) => {
        try {
            const response = await PostService.getUserPosts(query)
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        ownPosts: [],
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: INITIAL_PAGE_SIZE,
        query: ""
    },
    reducers: {
        set: (state, action) => {
            state.ownPosts = action.payload
        },
        query: (state, action) => {
            state.query = action.payload;
        },
        ...paginationReducers
    },
    extraReducers: builder => {
        builder

            .addCase(getPosts.fulfilled, (state, action) => {
                console.log(action.payload)
                state.ownPosts = action.payload.data
                state.totalRecords = action.payload.total;
                state.totalPages = Math.ceil(action.payload.total / state.pageSize) || 1;
            })

    }
})



export const { set, query, currentPage, pageSize } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;