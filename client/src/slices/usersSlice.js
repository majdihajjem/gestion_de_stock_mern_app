import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getListUsers = createAsyncThunk(
  "users/getListUsers",
  async (_, { rejectWithValue }) => {
    try {
      return axios
        .get("http://localhost:5000/api/v1/users")
        .then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    listUsers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    // getListUsers
    [getListUsers.fulfilled]: (state, { payload: listUsers }) => {
      state.loading = false;
      state.listUsers = listUsers;
    },
    [getListUsers.rejected]: (state, { payload: error }) => {
      state.error = error || "Error while getting users";
      state.loading = false;
    },
    [getListUsers.pending]: (state) => {
      state.loading = true;
    },

    // deleteUser
    [deleteUser.fulfilled]: (state, { payload: userId }) => {
      state.loading = false;
      state.listUsers = state.listUsers.filter((user) => user._id !== userId);
    },
    [deleteUser.rejected]: (state, { payload: error }) => {
      state.error = error || "Error while getting users";
      state.loading = false;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default usersSlice.reducer;
export const actions = usersSlice.actions;
