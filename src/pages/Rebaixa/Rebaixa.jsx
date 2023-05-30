import React from 'react';
import { AiOutlineShoppingCart, AiOutlineSend } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import './Rebaixa.css';

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
      ENVIAR: 'https://1drv.ms/x/s!Aunh5h-BPQ1LgQS1ishhDm7-b2P7?e=EgKHnE',
    }[buyer];

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`container-rebaixa ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-rebaixa">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
    </div>
  );
};

export default Rebaixa;
