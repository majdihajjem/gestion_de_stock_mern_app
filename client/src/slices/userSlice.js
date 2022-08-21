import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'
export const registerUser=createAsyncThunk('user/registerUser',async(data)=>{
    try {
        const res=await axios.post("http://localhost:5000/api/v1/users/register",data);
        return res.data;
    } catch (error) {
        
    }
})

const userSlice=createSlice({
    name:'user',
    initialState:{
        userInfo:{},
        token:null,
        isAuth:false,
        errors:null,
    },
    extraReducers:{
        [registerUser.fulfilled]:(state,action) => {
            state.token=action.payload.token;
            state.isAuth=true;
        },
        [registerUser.rejected]:(state,action) => {
            state.errors=action.payload;
        },
    }
})
export default userSlice.reducer;