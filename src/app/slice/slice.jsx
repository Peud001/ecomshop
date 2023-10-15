import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const api = 'https://fakestoreapi.com/products'

export const fetchData = createAsyncThunk('ecom/fetchData', async() => {
    try{
        const res = await axios.get(api)
        return res?.data
    }
    catch(err) {
        throw err.message
    }
})
const initialState = {
    status : 'idle',
    data : [],
    error : null,
    view : [],
    isOpen : false,
    searchResult : []
}

export const ecomSlice = createSlice({
    name : 'ecom',
    initialState,
    reducers:{
        getIsOpen(state, action){
            state.isOpen = action.payload
        },
        getSearchData(state, action){
            state.searchResult = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchData.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
        })
        .addCase(fetchData.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message 
        })
    }
})
export default ecomSlice.reducer;
export const getStatus = (state) => state.ecom
export const getData = (state) => state.ecom
export const {getIsOpen, getSearchData} = ecomSlice.actions

