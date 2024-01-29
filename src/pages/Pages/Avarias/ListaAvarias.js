import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import database from '../../../auth/firebase';
import logo from '../../../data/img/logotipo.png';
import './Style/lista.css';

const ListaAvarias = () => {
  const [avarias, setAvarias] = useState([]);
  const [selectedAvaria, setSelectedAvaria] = useState(null);

  useEffect(() => {
    const avariasRef = database.ref('BancoDadosAvarias');

    const fetchData = async () => {
      try {
        const snapshot = await avariasRef.once('value');
        const avariasData = snapshot.val();

        if (avariasData) {
          const avariasArray = Object.entries(avariasData).map(
            ([key, value]) => ({
              id: key,
              ...value,
            }),
          );
          setAvarias(avariasArray);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 40000);

    return () => {
      clearInterval(intervalId);
      avariasRef.off('value');
    };
  }, []);

  const handleAvariaClick = (avaria) => {
    setSelectedAvaria(avaria);
  };

  const handleCloseDetailCard = () => {
    setSelectedAvaria(null);
  };

  const detalhesOrdenados = [
    'ENVIO',
    'RESPONSAVEL',
    'COMPRADOR',
    'FILIAL',
    'CODIGO',
    'FORNECEDOR',
    'TIPO',
    'Nº NOTA',
    'VL NOTA',
    'VOLUME',
    'STATUS',
    'OBSERVAÇÕES',
  ];

  return (
    <div className="containerLista">
      <div className="form">
        <div className="lista-avarias">
          <Link to="/avarias/avarias-home" className="back-button">
            <span>&#8592;</span>   Enviar Avaria
          </Link>
          <img src={logo} alt="Logo" className="logo-form" />
          <h1 className="titulo">Lista de Avarias</h1>
          <ul className="avarias-list">
            {avarias.map((avaria) => (
              <li
                key={avaria.id}
                className={`avaria-item ${avaria.STATUS.toLowerCase()}`}
              >
                <button type="button" onClick={() => handleAvariaClick(avaria)}>
                  <div>
                    <span className="comprador">
                      <b>COMPRADOR:</b> {avaria.COMPRADOR}
                    </span>
                    <span className="fornecedor">
                      <b>FORNECEDOR:</b> {avaria.FORNECEDOR}
                    </span>
                    <span className="perca">
                      <b>TIPO:</b> {avaria.TIPO}
                    </span>
                    <span className="nota">
                      <b>Nº NOTA:</b> {avaria['Nº NOTA']}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          {selectedAvaria && (
            <div className="avaria-overlay">
              <div className="avaria-card-details">
                <button type="button" className="close" onClick={handleCloseDetailCard}>
                  <span>X</span>
                </button>
                <h2 className="titulo-detalhes">Detalhes da Avaria</h2>
                <div className="avaria-detalhes">
                  {detalhesOrdenados.map((key) => {
                    if (key !== 'id') {
                      return (
                        <div key={key} className="detalhe-item">
                          <span className="detalhe-label">
                            {key.toUpperCase()}:
                          </span>{' '}
                          {selectedAvaria[key]}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaAvarias;
