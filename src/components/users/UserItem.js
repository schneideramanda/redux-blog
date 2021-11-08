import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal';
import { getUser } from '../../store/users';

const UserItem = ({
  name,
  username,
  email,
  address,
  phone,
  website,
  company,
  id,
}) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(openModal());
    dispatch(getUser(id));
  }

  return (
    <div className='postItem' onClick={handleClick}>
      <div className='postHeader'>
        <p className='postTitle'>@{username}</p>
        <div className='userID'>{id}</div>
      </div>
    </div>
  );
};

export default UserItem;
