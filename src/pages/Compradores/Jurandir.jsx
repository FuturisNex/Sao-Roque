import React from 'react';
import { BsFolder } from 'react-icons/bs';
import { useStateContext } from '../../contexts/ContextProvider';
import '../Style-Card.css';

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

const Jurandir = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      104: 'https://docs.google.com/spreadsheets/d/1aDAwsHYgf658PbaD_fdiQKDfTo4vwz48WFzBYaCp9PY/edit?usp=drive_link',
      103: '',
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

export default Jurandir;
