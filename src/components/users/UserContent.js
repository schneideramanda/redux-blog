import React from 'react';
import {
  MdClose,
  MdEmail,
  MdHouse,
  MdPhone,
  MdLanguage,
  MdBusinessCenter,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { closeModal } from '../../store/modal';
import { usersSelector } from '../../store/users';

const UserContent = () => {
  const { selectedUser } = useSelector(usersSelector);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(closeModal());
  }

  return (
    <div className='modal'>
      <div className='modalClose' onClick={handleClick}>
        <MdClose />
      </div>
      <div>
        <h1 className='title'>{selectedUser.name}</h1>
        <ul>
          <li>
            <MdEmail /> {selectedUser.email}
          </li>
          <li>
            <MdHouse /> {selectedUser.address.street} - {''}
            {selectedUser.address.city}
          </li>
          <li>
            <MdPhone /> {selectedUser.phone}
          </li>
          <li>
            <MdLanguage /> {selectedUser.website}
          </li>
          <li>
            <MdBusinessCenter /> {selectedUser.company.name}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserContent;
