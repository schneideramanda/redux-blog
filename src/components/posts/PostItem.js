import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal';
import { getPost, getPostComments } from '../../store/posts';

const PostItem = ({ userId, title, body, id }) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(openModal());
    dispatch(getPost(id));
    dispatch(getPostComments(id));
  }

  return (
    <div className='postItem' onClick={handleClick}>
      <div className='postHeader'>
        <p className='postTitle'>{title}</p>
        <div className='userID'>{userId}</div>
      </div>
      <p className='postContent'>{body}</p>
    </div>
  );
};

export default PostItem;
