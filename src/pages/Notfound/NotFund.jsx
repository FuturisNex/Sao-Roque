import React from 'react';
import './NotFound.css';

function NotFound() {

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">Ops! A página que você está procurando não foi encontrada!</p>
    </div>
  );
}

export default NotFound;
