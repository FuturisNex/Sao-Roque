import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">Ops! A página que você está procurando não foi encontrada!</p>
      <button type="button" className="not-found__button" onClick={handleBackClick}>
        Página Inicial
      </button>
    </div>
  );
}

export default NotFound;
