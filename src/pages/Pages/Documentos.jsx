import React from 'react';
import { AiFillShop } from 'react-icons/ai';
import { IoMdPeople } from 'react-icons/io';
import { FaGoogleDrive, FaShoppingBag } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';
import '../Style-Card.css';

const buyers = [
  { name: 'DRIVE', icon: <FaGoogleDrive size={30} color="white" /> },
  { name: 'FORNECEDORES', icon: <IoMdPeople size={30} color="white" /> },
  { name: 'FILIAIS', icon: <AiFillShop size={30} color="white" /> },
  { name: 'LOJAS NOVAS', icon: <FaShoppingBag size={30} color="white" /> },

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

const Documentos = () => {
  const { currentMode } = useStateContext();

  const handleBuyerClick = (buyer) => {
    const url = {
      DRIVE: 'https://gsaoroque-my.sharepoint.com/:f:/g/personal/gustavo_batista_gruposaoroque_com/EpNxFnAUcpdCrhRiY8X09QIBM087cvW9nn5CgrQLRQc-Rg?e=4dv08P',
      FORNECEDORES: 'https://gsaoroque-my.sharepoint.com/:x:/g/personal/gustavo_batista_gruposaoroque_com/Eb2H5W_8tjZAuQA88FvCEeoBQjQSXzqS7AvjVVyctonQtw?e=dRKS3y',
      FILIAIS: 'https://gsaoroque-my.sharepoint.com/:x:/g/personal/gustavo_batista_gruposaoroque_com/Ed4CXqJ__99Om6Q9cSxjFqAB9Cn2gpn1GAgO1DDlYGslsg?e=YLKJLt',
      'LOJAS NOVAS': 'https://gsaoroque-my.sharepoint.com/:f:/g/personal/gustavo_batista_gruposaoroque_com/EsuTPpTUAPVMgKbldAnvrpQBpf7uwVnxqz2oePujdJniGQ?e=8Ghxm4',
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

export default Documentos;
