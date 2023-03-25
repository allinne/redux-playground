import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];

const FETCH_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(FETCH_URL);
  const data = await response.json();
  return data;
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

export const selectAllUsers = state => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === Number(userId));

export default usersSlice.reducer;
