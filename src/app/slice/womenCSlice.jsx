import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const WOMENC_API = "https://fakestoreapi.com/products/category/women's%20clothing"

const initialState = {
    womenC : [],
    status : 'idle',
    error : null
}

export const fetchWomenC = createAsyncThunk('womenC/fetchWomenC', async() => {
    try{
        const res = await axios.get(WOMENC_API)
        return res.data
    }
    catch(error){
        throw error.message
    }
})

export const womenCSlice = createSlice({
    name : 'womenCSlice',
    initialState,
    extraReducers(builder){
        builder
        .addCase(fetchWomenC.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchWomenC.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.womenC = action.payload
        })
        .addCase(fetchWomenC.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})
export default womenCSlice.reducer
export const getWomenC = state => state.womenC