import React from 'react';
import './Home.css';

const ReportsPage = () => (
  <div className="reports-page">
    <div className="report-container">
      <h2>Performance Varejo</h2>
      <iframe
        title="Relatório 2"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=888675be-0ffa-4f9a-8d1b-28096235db7b&autoAuth=true&ctid=94e777c0-1b94-4fdb-adef-eae087762289"
        frameBorder="0"
        allowFullScreen
      />
    </div>
    <div className="report-container">
      <h2>Desenpenho Varejo</h2>
      <iframe
        title="Relatório 2"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=ef6fb643-90ec-4491-854b-fd072bb535d3&autoAuth=true&ctid=94e777c0-1b94-4fdb-adef-eae087762289"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

export default ReportsPage;
