import React from 'react';
import { AiOutlineShoppingCart, AiOutlineSend } from 'react-icons/ai';
import { useStateContext } from '../../../contexts/ContextProvider';
import '../../Style-Card.css';

const buyers = [
  { name: 'REBAIXA', icon: <AiOutlineShoppingCart size={30} color="white" /> },
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

const Rebaixa = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      REBAIXA: 'https://docs.google.com/spreadsheets/d/1fpWoqKzuYC5_8G0RNtvjdpuUReQJnYjLB4RbGQl-ClY/edit?usp=sharing',
      ENVIAR: 'rebaixa-envio',
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

export default Rebaixa;
