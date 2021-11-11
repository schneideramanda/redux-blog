import React, { useEffect } from 'react';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Posts from './components/posts/Posts';
import Albums from './components/photos/Albums';
import Users from './components/users/Users';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './store/users';
import { currentPosts, getPosts, postsSelector } from './store/posts';
import { getAlbums } from './store/albums';

const App = () => {
  const dispatch = useDispatch();
  const { pages } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(getAlbums());
  }, [dispatch]);

  useEffect(() => {
    dispatch(currentPosts(pages.currentPage));
  }, [dispatch, pages.currentPage]);

  return (
    <div>
      <BrowserRouter>
        <div className='appHeader'>
          <Header />
        </div>
        <div className='appContent'>
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/albums' element={<Albums />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
