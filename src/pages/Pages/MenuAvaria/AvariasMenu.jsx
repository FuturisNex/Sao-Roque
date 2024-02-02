import React from 'react';
import { AiFillShop, AiOutlineSend } from 'react-icons/ai';
import { useStateContext } from '../../../contexts/ContextProvider';
import '../../Style-Card.css';

const buyers = [
  { name: 'AVARIAS', icon: <AiFillShop size={30} color="white" /> },
  { name: 'ENVIAR', icon: <AiOutlineSend size={30} color="white" /> },
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

const AvariaMenu = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      AVARIAS: 'https://docs.google.com/spreadsheets/d/1sFNMVHhasw7ie8RVzZ8NOJ10FPcFP5Q1asJEk6bEQmo/edit?usp=sharing',
      ENVIAR: '/avarias/avarias-home',
    }[buyer];

    if (url) {
      window.open(url, '_blank');
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

export default AvariaMenu;
