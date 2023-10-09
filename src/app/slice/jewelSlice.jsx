import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const JEWEL_API = 'https://fakestoreapi.com/products/category/jewelery'

const initialState = {
    jewel : [],
    status : 'idle',
    error : null
}

export const fetchJewel = createAsyncThunk('jewel/fetchJewel', async() => {
    try{
        const res = await axios.get(JEWEL_API)
        return res?.data
    }
    catch(error){
        throw error.message
    }
})

export const jewelSlice = createSlice({
    name : 'jewel',
    initialState,
    extraReducers(builder){
        builder
        .addCase(fetchJewel.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchJewel.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.jewel = action.payload
        })
        .addCase(fetchJewel.rejected, (state, action) =>{
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})
export default jewelSlice.reducer
export const getStatus = state => state.jewel


