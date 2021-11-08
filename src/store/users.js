import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  return await axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
});

const users = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    status: '',
  },
  reducers: {
    loadingUser: (state) => {
      state.loading = true;
    },
    selectUser: (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.users = action.payload;
    },
    [getUsers.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { selectUser, loadingUser } = users.actions;
export const usersSelector = (state) => state.users;
export default users.reducer;

export const getUser = (id) => async (dispatch) => {
  dispatch(loadingUser());
  return await axios

    .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => {
      const { data } = res;
      dispatch(selectUser(data));
    })
    .catch((err) => {
      console.error(err);
    });
};
