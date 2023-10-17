import React from 'react';
import './Drive.css';

function Drive() {
  const iframeUrl = 'https://lookerstudio.google.com/embed/reporting/b3ed707c-2106-4a76-816e-b52138f230f6/page/p_bsxgg1805c';

  const scaledIframeUrl = `${iframeUrl}&scale=0.5`; // Ajuste o valor de escala conforme necessário

  return (
    <iframe
      className="my-iframe"
      src={scaledIframeUrl}
      frameBorder="0"
      allowFullScreen
      title="Looker Report">
      </iframe>
  );
}

export default Drive;
