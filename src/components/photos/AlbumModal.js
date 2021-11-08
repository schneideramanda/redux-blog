import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { albumsSelector } from '../../store/albums';
import { closeModal, modalSelector } from '../../store/modal';
import Loading from '../helper/Loading';
import AlbumContent from './AlbumContent';

const AlbumModal = () => {
  const { modal } = useSelector(modalSelector);
  const { loading, selectedAlbum } = useSelector(albumsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  if (!modal) return null;

  return (
    <div className='modalBg' onClick={handleOutsideClick}>
      {loading && <Loading />}
      {selectedAlbum && <AlbumContent />}
    </div>
  );
};

export default AlbumModal;
