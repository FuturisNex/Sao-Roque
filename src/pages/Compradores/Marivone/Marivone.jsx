import React from 'react';
import { BsFolder } from 'react-icons/bs';
import { useStateContext } from '../../../contexts/ContextProvider';
import './Marivone.css';

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

const Marivone = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      104: 'https://docs.google.com/spreadsheets/d/1upuc5OBhPe0H2FQjzDZfEXIMcsrFl4GJyT3i-Nc00KI/edit?usp=sharing',
      103: '',
    }[buyer];

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`container-marivone ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-marivone">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
    </div>
  );
};

export default Marivone;
