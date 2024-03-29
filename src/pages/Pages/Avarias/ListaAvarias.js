import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import database from '../../../auth/firebase';
import './Style/lista.css';

const ListaAvarias = () => {
  const [avarias, setAvarias] = useState([]);
  const [selectedAvaria, setSelectedAvaria] = useState(null);
  const [envioFilter, setEnvioFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [fornecedorFilter, setFornecedorFilter] = useState('');

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

  // Filtrar avarias com base nos filtros selecionados
  const filteredAvarias = avarias.filter((avaria) => {
    const matchesEnvio = !envioFilter || avaria.ENVIO === envioFilter;
    const matchesResponsavel = !statusFilter || avaria.STATUS === statusFilter;
    const matchesFornecedor = !fornecedorFilter || avaria.FORNECEDOR === fornecedorFilter;

    return matchesEnvio && matchesResponsavel && matchesFornecedor;
  });

  return (
    <div className="containerLista">
      <Link to="/avarias/avarias-home" className="back-button">
        <span>&#8592;</span>   Enviar Avaria
      </Link>
      <div className="form1">
        <div className="lista-avarias">
          <div className="filter-options">
            <label htmlFor="envioFilter">Envio:</label>
            <select
              id="envioFilter"
              value={envioFilter}
              onChange={(e) => setEnvioFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {avarias.map((avaria) => avaria.ENVIO).filter((value, index, self) => self.indexOf(value) === index).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="statusFilter">Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {avarias.map((avaria) => avaria.STATUS).filter((value, index, self) => self.indexOf(value) === index).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="fornecedorFilter">Fornecedor:</label>
            <select
              id="fornecedorFilter"
              value={fornecedorFilter}
              onChange={(e) => setFornecedorFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {avarias.map((avaria) => avaria.FORNECEDOR).filter((value, index, self) => self.indexOf(value) === index).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <ul className="avarias-list">
            {filteredAvarias.map((avaria) => (
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
