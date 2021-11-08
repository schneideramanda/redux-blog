import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal';
import { getAlbum, getAlbumPhotos } from '../../store/albums';

const AlbumItem = ({ userId, id, title }) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(openModal());
    dispatch(getAlbum(id));
    dispatch(getAlbumPhotos(id));
  }

  return (
    <div className='postItem' onClick={handleClick}>
      <div className='postHeader'>
        <p className='postTitle'>{title}</p>
        <div className='userID'>{userId}</div>
      </div>
    </div>
  );
};

export default AlbumItem;
