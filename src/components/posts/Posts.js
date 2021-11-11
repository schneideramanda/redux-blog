import React from 'react';
import { useSelector } from 'react-redux';
import { postsSelector } from '../../store/posts';
import PostItem from './PostItem';
import Loading from '../helper/Loading';
import PostModal from './PostModal';
import PostTools from './PostTools';

const Posts = () => {
  const { posts, loadedPosts, status, userSelected, search } =
    useSelector(postsSelector);

  if (status === 'loading') return <Loading />;

  if (userSelected === 0 && search === '')
    return (
      <div>
        <PostModal />
        <div className='posts animateLeft'>
          <PostTools />
          {loadedPosts.map(({ userId, id, title, body }) => (
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

  return (
    <div>
      <PostModal />
      <div className='posts animateLeft'>
        <PostTools />
        {userSelected !== 0
          ? posts
              .filter(
                (post) =>
                  post.userId === userSelected && post.body.includes(search)
              )
              .map(({ userId, id, title, body }) => (
                <PostItem
                  key={id}
                  id={id}
                  userId={userId}
                  title={title}
                  body={body}
                />
              ))
          : posts
              .filter((post) => post.body.includes(search))
              .map(({ userId, id, title, body }) => (
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
