import React from 'react';
import './PowerBi.css';

function PowerBi() {
  const iframeUrl = "https://app.powerbi.com/reportEmbed?reportId=d999ba10-a2b4-470a-beb0-b0bc2b2b28eb&autoAuth=true&ctid=b920fdcf-9ac1-4457-bead-6525de40c640";

  const scaledIframeUrl = `${iframeUrl}&scale=0.5`;

  return (
    <iframe
      className="my-iframe"
      src={scaledIframeUrl}
      frameBorder="0"
      allowFullScreen
      title="Looker Report"
    ></iframe>
  );
}

export default PowerBi;
