import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import usersReducer from "./slices/usersSlice";

export default configureStore({
  reducer: { user: userReducer, products: productReducer, users: usersReducer },
});
