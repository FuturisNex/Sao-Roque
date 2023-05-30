import React from 'react';
import { FaTags } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { useStateContext } from '../../contexts/ContextProvider';
import './Encarte.css';

const buyers = [
  { name: 'ENCARTE', icon: <FaTags size={30} color="white" /> },
  { name: 'HORTIFRUTI', icon: <FiShoppingBag size={30} color="white" /> },
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

const Encarte = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      ENCARTE: 'https://1drv.ms/x/s!Aunh5h-BPQ1LgQS1ishhDm7-b2P7?e=EgKHnE',
      HORTIFRUTI: 'https://1drv.ms/x/s!Aunh5h-BPQ1LgTHuzJzOF8V9wHHX?e=ri4cZW',
    }[buyer];

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`container-encarte ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-encarte">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
    </div>
  );
};
export default Encarte;
