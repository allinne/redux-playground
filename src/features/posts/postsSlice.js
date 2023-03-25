import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import { nanoid } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const FETCH_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(FETCH_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post(FETCH_URL, initialPost);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            body,
            userId: Number(userId)
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, body, userId } = action.payload;
      const existingPost = state.posts.find(post => post.id === Number(id));
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
        existingPost.userId = Number(userId);
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    })
  }
});

export const { postAdded, postUpdated } = postsSlice.actions;
export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === Number(postId));

export default postsSlice.reducer;
