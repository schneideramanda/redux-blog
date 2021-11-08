import React from 'react';
import { useSelector } from 'react-redux';
import { usersSelector } from '../../store/users';
import Loading from '../helper/Loading';
import UserItem from './UserItem';
import UserModal from './UserModal';

const Users = () => {
  const { users } = useSelector(usersSelector);
  const { status } = useSelector(usersSelector);

  if (status === 'loading') return <Loading />;

  return (
    <div>
      <UserModal />
      <div className='posts animateLeft'>
        {users &&
          users.map(
            ({
              id,
              name,
              username,
              email,
              address,
              phone,
              website,
              company,
            }) => (
              <UserItem
                key={id}
                id={id}
                name={name}
                username={username}
                email={email}
                address={address}
                phone={phone}
                website={website}
                company={company}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Users;
