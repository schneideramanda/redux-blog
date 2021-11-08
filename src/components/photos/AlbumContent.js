import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { albumsSelector } from '../../store/albums';
import { closeModal } from '../../store/modal';
import { MdClose } from 'react-icons/md';

const AlbumContent = () => {
  const dispatch = useDispatch();
  const { selectedAlbum, photos } = useSelector(albumsSelector);

  function handleClick() {
    dispatch(closeModal());
  }

  return (
    <div className='modal'>
      <div className='postModalHeader'>
        <div className='postId'>{selectedAlbum.id}</div>
        <div className='modalClose' onClick={handleClick}>
          <MdClose />
        </div>
      </div>
      <div className='photoContainer'>
        {photos &&
          photos.map((photo) => (
            <div key={photo.id} className='photo'>
              <p>{photo.title}</p>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlbumContent;
