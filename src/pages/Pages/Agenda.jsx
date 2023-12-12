import React from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';
import '../Style-Card.css';

const buyers = [
  { name: 'AGENDAR', icon: <FaClock size={30} color="white" /> },
  { name: 'CALÊNDARIO', icon: <FaCalendarAlt size={30} color="white" /> },
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
      AGENDAR: 'https://outlook.office365.com/owa/calendar/Agenda@gruposaoroque.com/bookings/',
      CALÊNDARIO: 'https://outlook.live.com/owa/calendar/f50a311e-0c0e-40be-ac78-089d25ab4a61/3e801de7-c2f8-48f5-aa3c-b8de0ce39af9/cid-4B0D3D811FE6E1E9/index.html',
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

export default Analise;
