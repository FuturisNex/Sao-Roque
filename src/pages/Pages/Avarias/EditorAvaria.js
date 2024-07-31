import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';
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
    TIPO: ['Avarias Hortis', 'Validade | Vencido', 'Avarias | Danificado | Impróprio para Consumo'],
  };

  useEffect(() => {
    const fetchAvaria = async () => {
      try {
        const avariaRef = database.ref(`NotasAvarias/${id}`);
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

  const atualizarPlanilhaGoogle = async (dados) => {
    try {
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbyRqcYz2d1f3Hjba5nZPWd3VNZ4gSnZ3uLn1JmX0M_H27zdfR_zbm3zdSarOji0XS_T/exec',
        {
          SEQ: id,
          DataEnvio: dados.DataEnvio,
          Responsavel: dados.Responsavel,
          Comprador: dados.Comprador,
          Filial: dados.Filial,
          Cod: dados.Cod,
          Fornecedor: dados.Fornecedor,
          Departamento: dados.Departamento,
          Tipo: dados.Tipo,
          Volume: dados.Volume,
          Nota: dados.Nota,
          Vlnota: dados.Vlnota,
          Status: dados.Status,
          Obs: dados.Obs,
        },
      );

      if (response.status === 200) {
        console.log('Dados atualizados na planilha do Google com sucesso!');
      } else {
        console.error('Erro ao atualizar dados na planilha do Google:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o Google Apps Script:', error);
    }
  };

  const confirmSave = async () => {
    try {
      const dadosParaEnviar = {
        ...avaria,
        SEQ: id,
      };

      await database.ref(`NotasAvarias/${id}`).update(dadosParaEnviar);
      await atualizarPlanilhaGoogle(dadosParaEnviar);
      navigate('/avarias/avarias-lista');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    } finally {
      setShowModal(false);
    }
  };

  const getChangedFields = () => {
    if (!originalAvaria || !avaria) return [];

    const changedFields = [];

    Object.keys(avaria).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(avaria, key) && avaria[key] !== originalAvaria[key]) {
        changedFields.push({ field: key, oldValue: originalAvaria[key], newValue: avaria[key] });
      }
    });

    return changedFields;
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
                  {selectOptions[key].map((option, index) => (
                    <option key={index} value={option.split(' - ')[0]}>
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
                  className="form__input"
                />
              )}
            </label>
          </div>
        ))}
        <button type="submit" className="btn-salvar">Salvar</button>
        <button type="button" onClick={() => navigate('/avarias/avarias-lista')} className="btn-cancelar">Cancelar</button>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirmar alterações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Você tem certeza que deseja salvar as seguintes alterações?</h6>
          {changedFields.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Valor Original</th>
                  <th>Novo Valor</th>
                </tr>
              </thead>
              <tbody>
                {changedFields.map((field, index) => (
                  <tr key={index}>
                    <td>{field.field}</td>
                    <td>{field.oldValue}</td>
                    <td>{field.newValue}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Nenhuma alteração detectada.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={confirmSave}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditarAvaria;
