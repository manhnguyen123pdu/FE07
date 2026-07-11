import {configureStore} from "@reduxjs/toolkit"
import productSlice from "../feature/ProductSlice"
export const store = configureStore({
    reducer:{
        product: productSlice,
    }
})