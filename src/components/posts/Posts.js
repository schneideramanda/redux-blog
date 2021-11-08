import React from 'react';
import { useSelector } from 'react-redux';
import { postsSelector } from '../../store/posts';
import PostItem from './PostItem';
import Loading from '../helper/Loading';
import PostModal from './PostModal';
import PostTools from './PostTools';

const Posts = () => {
  const { posts, status } = useSelector(postsSelector);

  if (status === 'loading') return <Loading />;

  return (
    <div>
      <PostModal />

      <div className='posts animateLeft'>
        <PostTools />
        {posts &&
          posts.map(({ userId, id, title, body }) => (
            <PostItem
              key={id}
              id={id}
              userId={userId}
              title={title}
              body={body}
            />
          ))}
      </div>
    </div>
  );
};

export default Posts;
