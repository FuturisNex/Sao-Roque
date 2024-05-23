import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import database from '../../../auth/firebase';
import './Style/EditarAvaria.css';
import './Style/CustomModal.css';

const EditarAvaria = () => {
  const { id } = useParams();
  const [avaria, setAvaria] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [originalAvaria, setOriginalAvaria] = useState(null);
  const navigate = useNavigate();

  const detailOrder = [
    'FILIAL',
    'COMPRADOR',
    'CODIGO',
    'FORNECEDOR',
    'DEPARTAMENTO',
    'Nº NOTA',
    'VL NOTA',
    'VOLUME',
    'TIPO',
    'OBSERVACAO',
  ];

  const selectOptions = {
    FILIAL: ['1 - Santa Monica', '2 - Castro Alves', '4 - Fraga Maia', '5 - Artemia Pires', '11 - Tomé de Souza', '13 - Calamar', '14 - Artemia Express', '15 - Santo Estevão'],
    COMPRADOR: ['Rocha', 'Vitor', 'Sérgio', 'Jurandir', 'Ana Carina', 'Lucas', 'Cassio'],
    DEPARTAMENTO: ['Pet', 'Bebidas', 'Mercearia', 'Perfumaria', 'Limpeza', 'Utilidades', 'Frios e Laticinios', 'Congelados e Prato Pronto', 'Salgados, Defumados e Embutidos'],
    TIPO: ['Avarias Hortis', 'Validade | Vencido', 'Avarias | Danificado | Imprópio para Consumo'],
  };

  useEffect(() => {
    const fetchAvaria = async () => {
      try {
        const avariaRef = database.ref(`BancoDadosAvarias/${id}`);
        const snapshot = await avariaRef.once('value');
        if (snapshot.exists()) {
          const avariaData = snapshot.val();
          setAvaria(avariaData);
          setOriginalAvaria(avariaData);
        } else {
          console.error('Avaria não encontrada');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchAvaria();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvaria((prevAvaria) => ({
      ...prevAvaria,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSave = async () => {
    try {
      await database.ref(`BancoDadosAvarias/${id}`).update(avaria);
      navigate('/avarias/avarias-lista');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    } finally {
      setShowModal(false);
    }
  };

  const getChangedFields = () => {
    if (!originalAvaria || !avaria) return [];

    return Object.keys(avaria)
      .filter((key) => avaria[key] !== originalAvaria[key])
      .map((key) => ({ field: key, oldValue: originalAvaria[key], newValue: avaria[key] }));
  };

  const changedFields = getChangedFields();

  if (!avaria) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="editar-avaria-container">
      <h2 className="editar-avaria-titulo">Editar Avaria</h2>
      <form onSubmit={handleSave} className="editar-avaria-form">
        {detailOrder.map((key) => (
          <div key={key} className="form-group">
            <label className="form-label">
              {key}:
              {selectOptions[key] ? (
                <select
                  name={key}
                  value={avaria[key] || ''}
                  onChange={handleChange}
                  className="form__input select"
                >
                  {selectOptions[key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={avaria[key] || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              )}
            </label>
          </div>
        ))}
        <button type="submit" className="save-button custom-button">Salvar</button>
      </form>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Confirme as Alterações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {changedFields.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Valor Anterior</th>
                  <th>Novo Valor</th>
                </tr>
              </thead>
              <tbody>
                {changedFields.map(({ field, oldValue, newValue }) => (
                  <tr key={field}>
                    <td>{field}</td>
                    <td>{oldValue}</td>
                    <td>{newValue}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Não houve alterações nos dados.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="button-group">
            <Button variant="outline-secondary" size="lg" className="cancel-button" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" size="lg" className="custom-button" onClick={confirmSave}>Confirmar</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditarAvaria;
