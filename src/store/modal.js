import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
});

export const { openModal, closeModal } = modal.actions;
export const modalSelector = (state) => state.modal;
export default modal.reducer;
