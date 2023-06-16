import React from 'react';
import { AiOutlineShoppingCart, AiOutlineCloudDownload } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import './Analise.css';

const buyers = [
  { name: 'POWER_BI', icon: <AiOutlineShoppingCart size={30} color="white" /> },
  { name: 'DRIVE', icon: <AiOutlineCloudDownload size={30} color="white" /> },
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

const Analise = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      POWER_BI: 'https://app.powerbi.com/home?experience=power-bi',
      DRIVE: 'https://lookerstudio.google.com/reporting/07ec0290-fb22-40ae-87db-64721ab3f0a5',
    }[buyer];

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`container-analise ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-analise">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
    </div>
  );
};

export default Analise;
