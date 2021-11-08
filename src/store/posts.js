import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  return await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
});

const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    comments: [],
    status: '',
    pages: {
      firstPage: 1,
      currentPage: 1,
      lastPage: 10,
    },
  },
  reducers: {
    loadingPost: (state) => {
      state.loading = true;
    },
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
      state.loading = false;
    },
    getComments: (state, action) => {
      state.comments = action.payload;
    },
    nextPage: (state) => {
      state.pages.currentPage++;
    },
    previousPage: (state) => {
      state.pages.currentPage--;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { getComments, selectPost, loadingPost, nextPage, previousPage } =
  posts.actions;
export const postsSelector = (state) => state.posts;
export default posts.reducer;

export const getPost = (id) => async (dispatch) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => {
      const { data } = res;
      dispatch(selectPost(data));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getPostComments = (id) => async (dispatch) => {
  dispatch(loadingPost());
  return await axios
    .get('https://jsonplaceholder.typicode.com/comments')
    .then((res) => {
      const { data } = res;
      const filteredComments = data.filter((data) => data.postId === id);
      dispatch(getComments(filteredComments));
    })
    .catch((err) => {
      console.error(err);
    });
};
