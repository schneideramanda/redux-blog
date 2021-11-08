import React from 'react';
import { MdClose, MdComment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal';
import { postsSelector } from '../../store/posts';

const PostContent = () => {
  const dispatch = useDispatch();
  const { selectedPost, comments } = useSelector(postsSelector);

  function handleClick() {
    dispatch(closeModal());
  }

  return (
    <div className='modal'>
      <div className='postModalHeader'>
        <div className='postId'>{selectedPost.id}</div>
        <div className='modalClose' onClick={handleClick}>
          <MdClose />
        </div>
      </div>
      <div className='postContainer'>
        <div className='postInfo'>
          <p className='subtitle'>{selectedPost.title}</p>
          <p>{selectedPost.body}</p>
        </div>
        <div className='postComments'>
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className='commentInfo'>
                <MdComment /> {comment.email}
              </div>

              <div className='comment'>{comment.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
