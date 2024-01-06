import React from 'react';
import { FaCheese, FaShower } from 'react-icons/fa';
import { GiWineBottle, GiShoppingCart, GiSaltShaker } from 'react-icons/gi';
import { useStateContext } from '../../contexts/ContextProvider';
import '../Style-Card.css';

const buyers = [
  { name: 'SERGIO', icon: <FaCheese size={30} color="white" /> },
  { name: 'MARIVONE', icon: <FaShower size={30} color="white" /> },
  { name: 'VITOR', icon: <GiWineBottle size={30} color="white" /> },
  { name: 'SENA', icon: <GiShoppingCart size={30} color="white" /> },
  { name: 'JURANDIR', icon: <GiSaltShaker size={30} color="white" /> },
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
      SERGIO: '/sergio',
      MARIVONE: '/marivone',
      VITOR: '/vitor',
      SENA: '/sena',
      JURANDIR: '/jurandir',

    }[buyer];

    if (url) {
      window.location.href = url;
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
