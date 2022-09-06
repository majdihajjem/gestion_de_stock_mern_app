import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice'
export default configureStore({reducer: { user: userReducer,products:productReducer}})