import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'
import categoriesReducer from './features/categories/categoriesSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        categories: categoriesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})


export default store