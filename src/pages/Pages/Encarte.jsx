import React from 'react';
import { FaTags, FaDrumstickBite, FaAppleAlt } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';
import '../Style-Card.css';

const buyers = [
  { name: 'ENCARTE', icon: <FaTags size={30} color="white" /> },
  { name: 'HORTIFRUTI', icon: <FaAppleAlt size={30} color="white" /> },
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
      ENCARTE: 'https://gsaoroque-my.sharepoint.com/:x:/g/personal/gustavo_batista_gruposaoroque_com/ERWE-6dnq8pGmCgmN82I-s0BlShBNli92IGa2bYCjJcCJQ?e=SPKcfr',
      HORTIFRUTI: 'https://gsaoroque-my.sharepoint.com/:x:/g/personal/gustavo_batista_gruposaoroque_com/EUWS5ZCmQ-JLtlo65IXz2koBZ8YJLn72qOBj_MsPH7-O3w?e=dziQco',
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
export default Encarte;
