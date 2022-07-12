import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from '../features/crypto/cryptoSlice'


export const store = configureStore({
    reducer: {
        coins: coinsReducer,
    },
})