import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(process.env.REACT_APP_API + "/products", {
        headers: { token },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ onSuccess, onError, ...data }, { rejectWithValue, dispatch }) => {
    try {
      const form = new FormData();
      form.append("picture", data.file);
      form.append("title", data.title);
      form.append("desc", data.desc);
      form.append("Qte", data.Qte);
      const res = await axios.post(
        process.env.REACT_APP_API + "/products/addproduct",
        form,
        { headers: { token: localStorage.getItem("token") } }
      );

      onSuccess?.();

      return dispatch(getProducts());
    } catch (error) {
      onError?.();
      return rejectWithValue(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      );
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/addProduct",
  async ({ id, product, file }, { rejectWithValue, dispatch }) => {
    try {
      const form = new FormData();
      if (file) form.append("newPicture", file);

      form.append("title", product.title);
      form.append("desc", product.desc);
      form.append("Qte", product.Qte);

      console.log({ product, id, file });
      await axios
        .put(process.env.REACT_APP_API + "/products/" + id, form, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-type": "multipart/form-data",
            // "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(({ data }) => data);
      return dispatch(getProducts());
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(process.env.REACT_APP_API + "/products/" + id, {
        headers: { token },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    errors: null,
    loading: false,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload: products }) => {
      state.loading = false;
      state.productList = products;
      state.error = null;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    // deleteUser
    [deleteProduct.fulfilled]: (state, { payload: productId }) => {
      state.loading = false;
      state.productList = state.productList.filter((p) => p._id !== productId);
    },
    [deleteProduct.rejected]: (state, { payload: error }) => {
      state.error = error || "Error while deleteing product";
      state.loading = false;
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
  },
});
export default productSlice.reducer;
