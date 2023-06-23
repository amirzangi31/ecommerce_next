import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: true,
    cart: {},
    error: ""
}

const fetchCart = createAsyncThunk("cart/fetchCart", () => {
    return fetch("/api/order?type=noPaid").then(res => res.json()).then(data => data).catch(error => error)
})






const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload
            state.error = ""
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false
            state.cart = {},
            state.error = action.error.message
        })
    }
})




export default cartSlice.reducer
export { fetchCart }



