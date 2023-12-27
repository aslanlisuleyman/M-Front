import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios'

import toast from "react-hot-toast";
export const  getData=createAsyncThunk('getData',async()=>{
    const response=await axios.get('https://mongo-back-3obt.onrender.com/products')
    return response.data
})
export const updateData=createAsyncThunk('updateData',async ({id,updateData})=>{
    const res=await axios.put(`https://mongo-back-3obt.onrender.com/products/${id}`,updateData)
    return res.data
})

export const deleteData=createAsyncThunk('deleteData',async ({item})=>{
    const res=await axios.delete(`https://mongo-back-3obt.onrender.com/products/${item._id}`)
    return item
})

export const addData=createAsyncThunk('addData',async ({item})=>{
    const res=await axios.post(`https://mongo-back-3obt.onrender.com/products/`,item)
    return res.data
})


const dataSlice = createSlice({
    name: 'api',
    initialState: {
        data: [],
        loading: false,
        error: '',
        isFormOpen: false,
    },
    reducers: {
        openForm: (state) => {
            state.isFormOpen = true;
        },
        closeForm: (state) => {
            state.isFormOpen = false;
        },
       
        
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload;
            console.log(state.data);
        });
        builder.addCase(getData.rejected, (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        });



           builder.addCase(updateData.pending,(state)=>{
            state.loading=true
           })
           builder.addCase(updateData.fulfilled,(state,action)=>{
            state.loading=false
            state.data = state.data.map(item => (item.id === action.payload.id ? action.payload : item));
           })
           builder.addCase(updateData.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.message
           })


           builder.addCase(deleteData.pending,(state)=>{
            state.loading=true
           })
           builder.addCase(deleteData.fulfilled,(state,action)=>{
            state.loading=false
            state.data=[...state.data.filter(item=>item._id !=action.payload._id)]
           })
           builder.addCase(deleteData.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.message
           })
            

           builder.addCase(addData.pending,(state)=>{
            state.loading=true
           })
           builder.addCase(addData.fulfilled,(state,action)=>{
            state.loading=false
            state.data = [...state.data, action.payload];
           })
           builder.addCase(addData.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.message
           })





    }
        
    
});


export default dataSlice.reducer;

