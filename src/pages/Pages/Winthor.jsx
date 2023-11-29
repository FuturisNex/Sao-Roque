import React, { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import '../Style-Card.css';

const buyers = [
  { name: 'Fluxo de Compras | Abertura', videoId: 'e3Pryx0gFJo', icon: <AiFillPlayCircle size={45} color="white" /> },
  { name: 'Fluxo de Compras | Digitar Pedido', videoId: 'Z25hgEbgIEs', icon: <AiFillPlayCircle size={45} color="white" /> },
  { name: 'Fluxo de Compras | Receber Mercadoria', videoId: 'j4ZSvoGotls', icon: <AiFillPlayCircle size={45} color="white" /> },
  { name: 'Fluxo de Compras | Precificar Produto', videoId: '0vsJXkJMUhM', icon: <AiFillPlayCircle size={45} color="white" /> },
  { name: 'Fluxo de Compras | Devolução Fornecedor ', videoId: 'TqKBB4_741Y', icon: <AiFillPlayCircle size={45} color="white" /> },
  { name: 'Fluxo de Compras | Montar Bônus', videoId: 'JAOrixml7IA', icon: <AiFillPlayCircle size={45} color="white" /> },
  { name: 'Tranferencia', videoId: 'YEnRnU2P2xY', icon: <AiFillPlayCircle size={45} color="white" /> },
];

const BuyerCard = ({ buyer, handleClick }) => {
  const { currentMode, currentColor } = useStateContext();

  return (
    <div
      className={`buyer-card ${currentMode === 'Dark' ? 'dark' : ''}`}
      style={{ backgroundColor: currentColor }}
      onClick={() => handleClick(buyer.videoId)}
    >
      <div className="buyer-icon">{buyer.icon}</div>
      <p>{buyer.name}</p>
    </div>
  );
};

const VideoContainer = ({ videoId }) => {
  if (!videoId) {
    return null;
  }

  return (
    <div id="video-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Video Player"
        width="760"
        height="315"
      />
    </div>
  );
};

const Winthor = () => {
  const { currentMode } = useStateContext();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleBuyerClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className={`container ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
      <VideoContainer videoId={selectedVideo} />
    </div>
  );
};

export default Winthor;
