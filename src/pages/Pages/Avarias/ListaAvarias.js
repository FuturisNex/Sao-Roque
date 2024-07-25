import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import database from '../../../auth/firebase';
import './Style/lista.css';

const ListaAvarias = () => {
  const [avarias, setAvarias] = useState([]);
  const [selectedAvaria, setSelectedAvaria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);
  const [detailOrder] = useState([
    'FILIAL',
    'ENVIO',
    'STATUS',
    'RESPONSAVEL',
    'COMPRADOR',
    'CODIGO',
    'FORNECEDOR',
    'DEPARTAMENTO',
    'Nº NOTA',
    'VL NOTA',
    'VOLUME',
    'TIPO',
    'OBSERVACAO',
  ]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const navigate = useNavigate();

  const storeOrder = [1, 2, 4, 5, 11, 13, 14, 15];

  useEffect(() => {
    const avariasRef = database.ref('NotasAvarias');

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

          const storeSet = new Set(avariasArray.map((avaria) => avaria.FILIAL));
          const departmentSet = new Set(avariasArray.map((avaria) => avaria.DEPARTAMENTO));

          const fetchedStoreOptions = Array.from(storeSet)
            .filter(Boolean)
            .sort((a, b) => storeOrder.indexOf(parseInt(a, 10)) - storeOrder.indexOf(parseInt(b, 10)))
            .filter((store) => storeOrder.includes(parseInt(store, 10))); // Apenas mostrar as lojas na ordem desejada

          const fetchedDepartmentOptions = Array.from(departmentSet).filter(Boolean);

          setStoreOptions(fetchedStoreOptions);
          setDepartmentOptions(fetchedDepartmentOptions);
          setAvarias(avariasArray);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 40000);

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

  const handleEditAvaria = (id) => {
    navigate(`/editar-avaria/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = avarias
    .filter((avaria) => (selectedStore !== '' ? String(avaria.FILIAL) === selectedStore : true)
      && (selectedDepartment !== '' ? avaria.DEPARTAMENTO === selectedDepartment : true)
      && Object.values(avaria).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(pageNumber);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="containerLista">
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
          {storeOptions.length > 0 && (
            <select
              className="store-select"
              value={selectedStore}
              onChange={handleStoreChange}
            >
              <option value="">Todas as Filiais</option>
              {storeOptions.map((store) => (
                <option key={store} value={String(store)}>{store}</option>
              ))}
            </select>
          )}
          {departmentOptions.length > 0 && (
            <select
              className="department-select"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">Todos os Departamentos</option>
              {departmentOptions.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          )}
        </div>

        <div className="lista-avarias">
          <ul className="avarias-list">
            {filteredItems.map((avaria) => (
              <li
                key={avaria.id}
                className={`avaria-item ${avaria.STATUS.toLowerCase()}`}
                style={{
                  // eslint-disable-next-line no-nested-ternary
                  backgroundColor: avaria.STATUS === 'RESOLVIDO' ? '#98fb98' : avaria.STATUS === 'PENDENTE' ? '#f08080' : '#ffffff',
                }}
              >
                <button type="button" onClick={() => handleAvariaClick(avaria)}>
                  <div className="avaria-content">
                    <div className="filial-box">
                      {avaria.FILIAL}
                    </div>
                    <div className="avaria-info">
                      <span className="nota">
                        <b>Nº NOTA:</b> {avaria['Nº NOTA']}
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
                    </div>
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
                  {detailOrder.map((key) => (
                    <div key={key} className="detalhe-item">
                      <span className="detalhe-label">
                        {key.toUpperCase()}:
                      </span>{' '}
                      {selectedAvaria[key]}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => handleEditAvaria(selectedAvaria.id)} className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pagination">
          <div className="page-arrow" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            &#8249;
          </div>
          <div className="page-numbers">
            <span>Página: </span>
            <span className="page-number">{currentPage}</span>
          </div>
          <div className="page-arrow" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            &#8250;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaAvarias;
