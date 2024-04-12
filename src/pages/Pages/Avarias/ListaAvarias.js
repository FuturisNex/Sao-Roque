import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import database from '../../../auth/firebase';
import './Style/lista.css';

const ListaAvarias = () => {
  const [avarias, setAvarias] = useState([]);
  const [selectedAvaria, setSelectedAvaria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50); // Definindo um estado para a quantidade de itens por página

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
          ).sort((a, b) => parseInt(b.SEQ, 10) - parseInt(a.SEQ, 10));

          // Atualizando o estado da quantidade de itens por página para a quantidade total de avarias
          setItemsPerPage(avariasArray.length);

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

  const currentItems = avarias
    .filter((avaria) => Object.values(avaria).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())));

  // Removendo a lógica de paginação

  return (
    <div className="containerLista">
      <Link to="/avarias/avarias-home" className="back-button">
        Enviar Avarias
      </Link>
      <div className="form1">
        <div className="filter-options">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="lista-avarias">
          <ul className="avarias-list">
            {currentItems.map((avaria) => (
              <li
                key={avaria.id}
                className={`avaria-item ${avaria.STATUS.toLowerCase()}`}
              >
                <button type="button" onClick={() => handleAvariaClick(avaria)}>
                  <div>
                    <span className="comprador">
                      <b>LOJA:</b> {avaria.FILIAL}
                    </span>
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
                  {Object.entries(selectedAvaria)
                    .filter(([key]) => key !== 'id' && key !== 'SEQ')
                    .map(([key, value]) => (
                      <div key={key} className="detalhe-item">
                        <span className="detalhe-label">
                          {key.toUpperCase()}:
                        </span>{' '}
                        {value}
                      </div>
                    ))}
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
