import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../../api/services/CategoryService";

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
        loading: true
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


export default categorySlice.reducer