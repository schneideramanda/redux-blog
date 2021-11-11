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

export const currentPosts = createAsyncThunk(
  'posts/currentPosts',
  async (currentPage) => {
    console.log(currentPage);
    return await axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`
      )
      .then((res) => {
        const { data } = res;
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loadedPosts: [],
    selectedPost: null,
    loading: false,
    comments: [],
    status: '',
    pages: {
      firstPage: 1,
      currentPage: 1,
      lastPage: 10,
    },
    userSelected: 0,
    search: '',
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
    setUserSelected: (state, action) => {
      state.userSelected = action.payload;
    },
    searchParams: (state, action) => {
      state.search = action.payload;
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
    [currentPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [currentPosts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.loadedPosts = action.payload;
    },
    [currentPosts.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const {
  getComments,
  selectPost,
  loadingPost,
  nextPage,
  previousPage,
  setUserSelected,
  searchParams,
} = posts.actions;
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
