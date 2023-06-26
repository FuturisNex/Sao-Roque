import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import './Comprador.css';

const buyers = [
  { name: 'ADAUTO', icon: <AiOutlineUser size={30} color="white" /> },
  { name: 'MARIVONE', icon: <AiOutlineUser size={30} color="white" /> },
  { name: 'NETA', icon: <AiOutlineUser size={30} color="white" /> },
  { name: 'SENA', icon: <AiOutlineUser size={30} color="white" /> },
];

const BuyerCard = ({ buyer, handleClick }) => {
  const { currentMode, currentColor } = useStateContext();

  return (
    <div
      className={`buyer-card ${currentMode === 'Dark' ? 'dark' : ''}`}
      style={{ backgroundColor: currentColor }}
      onClick={() => handleClick(buyer.name)}
    >
      <div className="buyer-icon">{buyer.icon}</div>
      <p>{buyer.name}</p>
    </div>
  );
};

const Comprador = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      ADAUTO: '/adauto',
      MARIVONE: '/marivone',
      NETA: '/neta',
      SENA: '/sena',

    }[buyer];
    
        if (url) {
      window.open(url);
    }
    
  };

  return (
    <div className={`container ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
    </div>
  );
};
export default Comprador;
