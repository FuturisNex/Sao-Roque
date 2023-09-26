import React from 'react';
import { FaCheese, FaShower } from 'react-icons/fa'; // Ícone de frios
import { GiWineBottle, GiShoppingCart, GiSaltShaker } from 'react-icons/gi'; // Ícone de bebidas
import { useStateContext } from '../../contexts/ContextProvider';
import './Comprador.css';

const buyers = [
  { name: 'ADAUTO', icon: <FaCheese size={30} color="white" /> }, // Ícone de frios
  { name: 'MARIVONE', icon: <FaShower size={30} color="white" /> }, // Ícone de higiene (alterado)
  { name: 'NETA', icon: <GiWineBottle size={30} color="white" /> }, // Ícone de bebidas
  { name: 'SENA', icon: <GiShoppingCart size={30} color="white" /> }, // Novo ícone para Sena (Supermercado)
  { name: 'JURANDIR', icon: <GiSaltShaker size={30} color="white" /> } // Novo ícone para Jurandir (Temperos)
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

const Comprador = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      ADAUTO: '/adauto',
      MARIVONE: '/marivone',
      NETA: '/neta',
      SENA: '/sena',
      JURANDIR: '/jurandir',

    }[buyer];

    if (url) {
      window.location.href = url;
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
export default Comprador;
