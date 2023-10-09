import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const ELECT_API = 'https://fakestoreapi.com/products/category/electronics'

export const fetchElect = createAsyncThunk('elect/fetchElect', async() => {
    try{
        const res = await axios.get(ELECT_API)
        return res?.data
    }
    catch(error){
        throw error.message
    }
})

const initialState = {
    elect : [],
    status : 'idle',
    error : null
}

export const electSlice = createSlice({
    name : 'elect',
    initialState,
    extraReducers(builder){
        builder
        .addCase(fetchElect.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchElect.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.elect = action.payload
        })
        .addCase(fetchElect.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})
export default electSlice.reducer
export const getElect = state => state.elect
