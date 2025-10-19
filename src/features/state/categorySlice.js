import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../../api/services/CategoryService";
import { paginationReducers } from "./pagination";

export const getCategories = createAsyncThunk(
    'categories/fetch',
    async (query, { rejectWithValue }) => {
        try {
            const response = await CategoryService.get(query)
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: true,
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 5,
        query: ""
    },
    reducers: {
        query: (state, action) => {
            state.query = action.payload;
        },
        ...paginationReducers
    },
    extraReducers: builder => {
        builder
            .addCase(getCategories.pending, state => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, state => {
                state.loading = false;
            })
    }
})

export const { query, currentPage, pageSize } = categorySlice.actions;
export default categorySlice.reducer