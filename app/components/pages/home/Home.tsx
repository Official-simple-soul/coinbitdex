import React from 'react';
import UnAuthLayout from '../../../layouts/UnAuthLayout';

const Home: React.FC = () => {
  return (
    <UnAuthLayout>
      <h1>Home</h1>
      <p>Welcome to the home page.</p>
    </UnAuthLayout>
  );
};

export default Home;
