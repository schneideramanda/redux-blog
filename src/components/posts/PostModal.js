import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { closeModal, modalSelector } from '../../store/modal';
import { postsSelector } from '../../store/posts';
import Loading from '../helper/Loading';
import PostContent from './PostContent';

const PostModal = () => {
  const { modal } = useSelector(modalSelector);
  const { loading, selectedPost } = useSelector(postsSelector);
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
      {selectedPost && <PostContent />}
    </div>
  );
};

export default PostModal;
