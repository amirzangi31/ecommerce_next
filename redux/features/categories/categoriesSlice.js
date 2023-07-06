import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: true,
    categories: {},
    error: ""
}

const fetchCategories = createAsyncThunk("categries/fetchCategories", () => {
    return fetch("/api/categories").then(res => res.json()).then(data => data).catch(error => error)
})


const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
            state.error = ""
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false
            state.categories = {},
                state.error = action.error.message
        })
    }
})




export default categoriesSlice.reducer
export { fetchCategories }