import React, { useState, useEffect } from 'react';
import { MdSearch, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  nextPage,
  postsSelector,
  previousPage,
  searchParams,
  setUserSelected,
} from '../../store/posts';
import { usersSelector } from '../../store/users';

const PostTools = () => {
  const dispatch = useDispatch();
  const { pages } = useSelector(postsSelector);
  const { users } = useSelector(usersSelector);
  const isFirstPage = pages.firstPage === pages.currentPage;
  const isLastPage = pages.lastPage === pages.currentPage;
  const [select, setSelect] = useState('');
  const [search, setSearch] = useState('');
  const [windowSize, setWindowSize] = useState('');

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize <= 640;

  function handleNext() {
    dispatch(nextPage());
  }

  function handlePrevious() {
    dispatch(previousPage());
  }

  function handleSelect({ target }) {
    setSelect(target.value);
    const userNumber = Number(target.value.replace(/\D/g, ''));
    dispatch(setUserSelected(userNumber));
  }

  function handleSearch({ target }) {
    setSearch(target.value);
    dispatch(searchParams(target.value));
  }

  return (
    <div className='toolsContainer'>
      <div className='searchTool'>
        <input
          type='text'
          placeholder='Search for content'
          value={search}
          onChange={handleSearch}
        />
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
        <select value={select} onChange={handleSelect}>
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
