import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, modalSelector } from '../../store/modal';
import { useSelector } from 'react-redux';
import { usersSelector } from '../../store/users';
import Loading from '../helper/Loading';
import UserContent from './UserContent';

const UserModal = () => {
  const { modal } = useSelector(modalSelector);
  const { loading, selectedUser } = useSelector(usersSelector);
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
      {selectedUser && <UserContent />}
    </div>
  );
};

export default UserModal;
