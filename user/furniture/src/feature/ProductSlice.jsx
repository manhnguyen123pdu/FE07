import {createSlice} from "@reduxjs/toolkit"
// 1. định nghĩa initialState
let initialState = {
    test: 1
}

// 2. tạo slice
const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{}
    // extraReducers:{}
})

export const {} = productSlice.actions;
export default productSlice.reducer;