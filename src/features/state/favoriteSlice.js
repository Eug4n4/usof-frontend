import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "../../api/services/PostService";
import { paginationReducers } from "./pagination";
import { INITIAL_PAGE_SIZE } from "../constants";
export const getFavorites = createAsyncThunk(
    'favorites/posts',
    async (query, { rejectWithValue }) => {
        try {
            console.log("Here")
            const response = await PostService.getUserFavoritePosts(query)
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: [],
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

            .addCase(getFavorites.fulfilled, (state, action) => {
                console.log(action.payload)
                state.favorites = action.payload.data
                state.totalRecords = action.payload.total;
                state.totalPages = Math.ceil(action.payload.total / state.pageSize) || 1;
            })

    }
})
export const actions = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
