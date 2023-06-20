import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userReducer from './features/user/userSlice'
import cartsReducer from './features/cart/cartSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        carts: cartsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})


export default store