import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAlbums = createAsyncThunk('albums/getAlbums', async () => {
  return await axios
    .get('https://jsonplaceholder.typicode.com/albums')
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
});

const albums = createSlice({
  name: 'albums',
  initialState: {
    albums: [],
    selectedAlbum: null,
    photos: [],
    loading: false,
    status: '',
  },
  reducers: {
    loadingAlbum: (state) => {
      state.loading = true;
    },
    selectAlbum: (state, action) => {
      state.loading = false;
      state.selectedAlbum = action.payload;
    },
    getPhotos: (state, action) => {
      state.photos = action.payload;
    },
  },
  extraReducers: {
    [getAlbums.pending]: (state) => {
      state.status = 'loading';
    },
    [getAlbums.fulfilled]: (state, action) => {
      state.status = 'success';
      state.albums = action.payload;
    },
    [getAlbums.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { loadingAlbum, selectAlbum, getPhotos } = albums.actions;
export const albumsSelector = (state) => state.albums;
export default albums.reducer;

export const getAlbum = (id) => async (dispatch) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/albums/${id}`)
    .then((res) => {
      const { data } = res;
      dispatch(selectAlbum(data));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAlbumPhotos = (id) => async (dispatch) => {
  return await axios
    .get('https://jsonplaceholder.typicode.com/photos')
    .then((res) => {
      const { data } = res;
      const filteredPhotos = data.filter((data) => data.albumId === id);
      dispatch(getPhotos(filteredPhotos));
    })
    .catch((err) => {
      console.error(err);
    });
};
