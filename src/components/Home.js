import React from 'react';

const Home = () => {
  return (
    <div className='homeContainer'>
      <div className='home animateLeft'>
        <h1 className='subtitle'>A simple project using React and Redux</h1>
        <p className='content'>
          This project was created with the purpose to study React and Redux,
          using async slices from toolkit to fetch fake API data and work with
          it.
        </p>
        <p className='content'>
          Created with the purpose to study responsive websites and styles too.
        </p>
      </div>
    </div>
  );
};

export default Home;
