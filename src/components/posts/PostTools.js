import React, { useState } from 'react';
import { MdSearch, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { nextPage, postsSelector, previousPage } from '../../store/posts';
import { usersSelector } from '../../store/users';

const PostTools = () => {
  const dispatch = useDispatch();
  const { pages } = useSelector(postsSelector);
  const { users } = useSelector(usersSelector);
  const isFirstPage = pages.firstPage === pages.currentPage;
  const isLastPage = pages.lastPage === pages.currentPage;
  const { user, setUser } = useState('');

  function handleNext() {
    dispatch(nextPage());
  }

  function handlePrevious() {
    dispatch(previousPage());
  }

  return (
    <div className='toolsContainer'>
      <div className='searchTool'>
        <input type='text' placeholder='Search for content' />
        <span className='searchIcon'>
          <MdSearch />
        </span>
      </div>
      <div className='paginationTool'>
        <button
          className={`paginationBtn ${isFirstPage ? 'disabled' : ''}`}
          onClick={handlePrevious}
        >
          <MdNavigateBefore />
        </button>
        {pages.currentPage} / {pages.lastPage}
        <button
          className={`paginationBtn ${isLastPage ? 'disabled' : ''}`}
          onClick={handleNext}
        >
          <MdNavigateNext />
        </button>
      </div>
      <div className='userSearch'>
        <select value={user} onChange={() => setUser(user)}>
          <option value=''>Choose an User</option>
          {users &&
            users.map(({ id, username }) => (
              <option key={id}>
                {id} - {username}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default PostTools;
