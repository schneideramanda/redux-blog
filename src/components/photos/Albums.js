import React from 'react';
import { useSelector } from 'react-redux';
import { albumsSelector } from '../../store/albums';
import AlbumItem from './AlbumItem';
import Loading from '../helper/Loading';
import AlbumModal from './AlbumModal';

const Albums = () => {
  const { albums, status } = useSelector(albumsSelector);

  if (status === 'loading') return <Loading />;

  return (
    <div>
      <AlbumModal />
      <div className='posts animateLeft'>
        {albums &&
          albums.map(({ userId, id, title }) => (
            <AlbumItem userId={userId} key={id} id={id} title={title} />
          ))}
      </div>
    </div>
  );
};

export default Albums;
