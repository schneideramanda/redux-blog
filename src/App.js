import React, { useEffect } from 'react';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Posts from './components/posts/Posts';
import Albums from './components/photos/Albums';
import Users from './components/users/Users';
import { useDispatch } from 'react-redux';
import { getUsers } from './store/users';
import { getPosts } from './store/posts';
import { getAlbums } from './store/albums';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(getAlbums());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
