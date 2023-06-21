import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: true,
    user: {},
    error: ""
}

const fetchUser = createAsyncThunk("users/fetchUser", () => {
    return fetch("/api/user").then(res => res.json()).then(data => data)
})




const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ""
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.user = {},
            state.error = action.error.message
        })
    }
})




export default userSlice.reducer
export { fetchUser }



