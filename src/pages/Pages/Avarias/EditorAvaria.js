import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import database from '../../../auth/firebase';
import './Style/EditarAvaria.css';

const EditarAvaria = () => {
  const { id } = useParams();
  const [avaria, setAvaria] = useState(null);
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

  useEffect(() => {
    const fetchAvaria = async () => {
      try {
        const avariaRef = database.ref(`BancoDadosAvarias/${id}`);
        const snapshot = await avariaRef.once('value');
        if (snapshot.exists()) {
          const avariaData = snapshot.val();
          setAvaria(avariaData);
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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await database.ref(`BancoDadosAvarias/${id}`).update(avaria);
      navigate('/avarias/avarias-lista');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

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
              <input
                type="text"
                name={key}
                value={avaria[key] || ''}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
        ))}
        <button type="submit" className="save-button">Salvar</button>
      </form>
    </div>
  );
};

export default EditarAvaria;
