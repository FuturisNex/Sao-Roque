import React from 'react';
import { AiFillShop } from 'react-icons/ai';
import { IoMdPeople } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import './Contratos.css';

const buyers = [
  { name: 'DRIVE', icon: <AiFillShop size={30} color="white" /> },
  { name: 'FORNECEDORES', icon: <IoMdPeople size={30} color="white" /> },
  { name: 'LOJAS', icon: <AiFillShop size={30} color="white" /> },
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

const Contratos = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      DRIVE: 'https://drive.google.com/drive/folders/1HO28LH6vEyn61a5Im0AXiqtPb03I4bsK?usp=sharing',
      FORNECEDORES: 'https://docs.google.com/spreadsheets/d/14h7LutZ--7YvGK2Xbm8QqCb1DnQd2IDs3Sd71RUF4TU/edit?usp=share_link',
      LOJAS: 'https://1drv.ms/x/s!Aunh5h-BPQ1LgSgHvulSJogZPW88?e=UfX02C',
    }[buyer];

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`container-contratos ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-contratos">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
    </div>
  );
};

export default Contratos;
