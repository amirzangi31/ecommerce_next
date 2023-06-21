import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})


export default store