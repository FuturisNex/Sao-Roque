import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import { Link } from 'react-router-dom';
import './Comprador.css';

const buyers = ['ADAUTO', 'MARIVONE', 'NETA', 'SENA'];

const Comprador = () => {
  const { currentMode, currentColor } = useStateContext();

  return (
    <div className={`buyers-container ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-grid">
        {buyers.map((buyer, index) => (
          <Link
            key={index}
            to={`/${buyer.toLowerCase()}`}
            className={`buyer-card ${currentMode === 'Dark' ? 'dark' : ''}`}
            style={{ backgroundColor: currentColor }}
          >
            <AiOutlineUser size={30} color="white" />
            <p>{buyer}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Comprador;
