import React from 'react';
import { BsFolder } from 'react-icons/bs';

import { useStateContext } from '../../../contexts/ContextProvider';
import './Adauto.css';

const buyers = [
  { name: '104', icon: <BsFolder size={30} color="white" /> },
  { name: '103', icon: <BsFolder size={30} color="white" /> },
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

const Adauto = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      104: 'https://1drv.ms/x/s!Aunh5h-BPQ1LgRuz4Bp4_U2p5sjf',
      103: 'https://1drv.ms/x/s!Aunh5h-BPQ1LgSpJDb_hXw_nPjOI?e=zszoaP',
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

export default Adauto;
