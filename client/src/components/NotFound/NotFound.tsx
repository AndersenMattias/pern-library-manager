import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const onHandle404 = () => {
    navigate('/', { replace: true });
  };
  return (
    <div style={{ backgroundColor: 'red', height: '5em' }}>
      <p>Page not found..</p>
      <button onClick={onHandle404}>Go back</button>
    </div>
  );
};

export default NotFound;
