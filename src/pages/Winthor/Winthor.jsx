import React, { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import './Winthor.css';

const buyers = [
  { name: 'DIA DO COMPRADOR', videoId: 'ervgfH_YtJw', icon: <AiFillPlayCircle size={45} color="white" /> },
  { name: 'TRANSFERENCIA', videoId: 'YEnRnU2P2xY', icon: <AiFillPlayCircle size={45} color="white" /> },
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
    <div className={`encarte-container ${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="buyers-container">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
      <VideoContainer videoId={selectedVideo} />
    </div>
  );
};

export default Winthor;
