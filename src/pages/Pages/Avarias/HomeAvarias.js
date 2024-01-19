import React from 'react';
import { Link } from 'react-router-dom';
import './Style/home.css';

const HomeAvarias = () => (
  <div className="home-container">
    <div className="header">
      <h1>Bem-vindo ao Portal de Avarias</h1>
    </div>
    <div className="options">
      <Link to="/enviar" className="option">
        <button type="button" className="btn-primary">Enviar</button>
      </Link>
      <Link to="/lista" className="option">
        <button type="button" className="btn-secondary">Lista</button>
      </Link>
    </div>
  </div>
);

export default HomeAvarias;
