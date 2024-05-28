import React from 'react';
import './Home.css';

const ReportsPage = () => (
  <div className="reports-page">
    <div className="report-container">
      <h2>Relatório 1</h2>
      <iframe
        title="Relatório 1"
        width="1200"
        height="150"
        src="https://lookerstudio.google.com/embed/reporting/6dd0c967-915c-47e4-a828-4ac1f129d7bd/page/aKZnD"
        frameBorder="0"
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
    <div className="report-container">
      <h2>Relatório 2</h2>
      <iframe
        title="Relatório 2"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=888675be-0ffa-4f9a-8d1b-28096235db7b&autoAuth=true&ctid=94e777c0-1b94-4fdb-adef-eae087762289"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

export default ReportsPage;
