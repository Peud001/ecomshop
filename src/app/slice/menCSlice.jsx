import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const MENC_API = "https://fakestoreapi.com/products/category/men's%20clothing";

const initialState = {
    menC : [],
    status : 'idle',
    error : null
}
export const fetchMenC = createAsyncThunk('menC/fetchMenC', async() =>{
    try{
        const res = await axios.get(MENC_API)
        return res.data
    }
    catch(error){
        throw error.message
    }
})
export const menCSlice = createSlice({
    name : 'menC',
    initialState,
    extraReducers(builder){
        builder
        .addCase(fetchMenC.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchMenC.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.menC = action.payload
        })
        .addCase(fetchMenC.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})
export default menCSlice.reducer
export const getMenC = state => state.menC