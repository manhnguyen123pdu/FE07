import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    async () => {
        try {
            let resp = await axios.get("http://localhost:3000/products");
            return resp.data
        } catch (e) {
            console.log(e)
        }
    }
)
export const fetchProductByID = createAsyncThunk(
    "product/fetchProductByID",
    async (id) => {
        try {
            let resp = await axios.get(`http://localhost:3000/products/${id}`);
            return resp.data
        } catch (e) {
            console.log(e)
        }
    }
)
// 1. định nghĩa initialState
let initialState = {
    products: [],
    loading: false,
    currentProduct: {},
    err: ""
}

// 2. tạo slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProduct.fulfilled, (state, actions) => {
                state.loading = false,
                    state.products = actions.payload
            })
            .addCase(fetchProduct.rejected, (state, actions) => {
                state.loading = false,
                    state.err = "Lỗi"
            })
            .addCase(fetchProductByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductByID.fulfilled, (state, actions) => {
                state.loading = false,
                    state.currentProduct = actions.payload
            })
            .addCase(fetchProductByID.rejected, (state, actions) => {
                state.loading = false,
                    state.err = "Lỗi"
            })
    }
})

export const { } = productSlice.actions;
export default productSlice.reducer;