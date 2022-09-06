import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const getProducts=createAsyncThunk('products/getProducts',async(data,{rejectWithValue})=>{
    try {
        const res=await axios.get("http://localhost:5000/api/v1/products")
        return res.data
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.msg
            ?error.response.data.msg
            :error.message)
    }
})

export const addProduct=createAsyncThunk('products/addProduct',async(data,{rejectWithValue,dispatch})=>{
    try {
        const form= new FormData()
        form.append('picture',data.file)
        form.append('title',data.title)
        form.append('desc',data.desc)
        form.append('Qte',data.Qte)
        const res=await axios.post("http://localhost:5000/api/v1/products/addproduct",form,{headers:{token:localStorage.getItem('token')}})
        return dispatch(getProducts())
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.msg
            ?error.response.data.msg
            :error.message)
    }
})


const productSlice=createSlice({
    name:'products',
    initialState:{
        productList:[],
        errors:null,
        loading:false
    },
    extraReducers:{
        [getProducts.pending]:(state)=>{
            state.loading=true
        },
        [getProducts.fulfilled]:(state,action)=>{
            state.loading=false
            state.productList=action.payload
            state.error=null
        },
        [getProducts.rejected]:(state,action)=>{
            state.loading=false
            state.errors=action.payload
        },
    }
})
export default productSlice.reducer;