import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import database from '../../../auth/firebase';

const EditarAvaria = () => {
  const { id } = useParams();
  const [avaria, setAvaria] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvaria = async () => {
      try {
        const avariaRef = database.ref(`BancoDadosAvarias/${id}`);
        const snapshot = await avariaRef.once('value');
        const avariaData = snapshot.val();
        setAvaria(avariaData);
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

  const handleSave = async () => {
    try {
      await database.ref(`BancoDadosAvarias/${id}`).update(avaria);
      navigate('/avarias/avarias-home');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  if (!avaria) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Editar Avaria</h2>
      <form onSubmit={handleSave}>
        {Object.entries(avaria).map(([key, value]) => (
          <div key={key}>
            <label>
              {key}:
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarAvaria;
