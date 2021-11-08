import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <nav className='navContainer'>
      <Link className='navLink' to='/'>
        Home
      </Link>
      <Link className='navLink' to='/posts'>
        Posts
      </Link>
      <Link className='navLink' to='/albums'>
        Albums
      </Link>
      <Link className='navLink' to='/users'>
        Users
      </Link>
    </nav>
  );
};

export default HeaderNav;
