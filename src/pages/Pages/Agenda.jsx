import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useStateContext } from "../../contexts/ContextProvider";
import "../Style-Card.css";

const buyers = [
  { name: "AGENDAR", icon: <FaClock size={30} color="white" /> },
  { name: "CALÊNDARIO", icon: <FaCalendarAlt size={30} color="white" /> },
];

const BuyerCard = ({ buyer, handleClick }) => {
  const { currentMode, currentColor } = useStateContext();

  return (
    <div
      className={`buyer-card ${currentMode === "Dark" ? "dark" : ""}`}
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
      AGENDAR: "comercial/agenda/fornecedor",
      CALÊNDARIO: "https://outlook.office.com/bookings/calendar",
    }[buyer];

    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className={`container ${currentMode === "Dark" ? "dark" : ""}`}>
      <div className="buyers">
        {buyers.map((buyer, index) => (
          <BuyerCard key={index} buyer={buyer} handleClick={handleBuyerClick} />
        ))}
      </div>
    </div>
  );
};

export default Analise;
