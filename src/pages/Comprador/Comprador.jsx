import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import './Comprador.css';

const buyers = ['ADAUTO', 'MARIVONE', 'NETA', 'SENA'];

const Comprador = () => {
  const { currentMode, currentColor } = useStateContext();

  const handleBuyerClick = (buyer) => {
    console.log(`Clicou no comprador: ${buyer}`);
    // Adicione o código adicional que você deseja executar quando um comprador for clicado
  };

  return (
    <div className={`buyers-container ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-grid">
        {buyers.map((buyer, index) => (
          <div
            key={index}
            className={`buyer-card ${currentMode === 'Dark' ? 'dark' : ''}`}
            style={{ backgroundColor: currentColor }}
            onClick={() => handleBuyerClick(buyer)}
          >
            <AiOutlineUser size={30} color="white" />
            <p>{buyer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comprador;
