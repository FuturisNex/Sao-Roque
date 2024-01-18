import React, { useState, useEffect } from 'react';
import database from '../../../auth/firebase';
import "./Style/lista.css";

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
                    const avariasArray = Object.entries(avariasData).map(([key, value]) => ({
                        id: key,
                        ...value,
                    }));
                    setAvarias(avariasArray);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();

        return () => {
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
        'Nº VERBA',
        'ENVIO',
        'RESPONSAVEL',
        'FILIAL',
        'CODIGO',
        'FORNECEDOR',
        'TIPO',
        'PERCA',
        'QUANTIDADE',
        'Nº NOTA',
        'VL NOTA',
        'STATUS',
        'OBSERVAÇÕES',
    ];

    return (
        <div className='containerLista'>
            <div className="form">
                <div className="lista-avarias">
                    <h1 className="titulo">Lista de Avarias</h1>
                    <ul className="avarias-list">
                        {avarias.map((avaria) => (
                            <li
                                key={avaria.id}
                                onClick={() => handleAvariaClick(avaria)}
                                className={`avaria-item ${avaria.STATUS.toLowerCase()}`}
                            >
                             <div>
                                <span className="fornecedor"><b>FORNECEDOR:</b> {avaria.FORNECEDOR}</span><br />
                                <span className="nota"><b>Nº NOTA:</b> {avaria['Nº NOTA']}</span><br />
                                <span className="perca"><b>PERCA:</b> {avaria.PERCA}</span>
                             </div>
                            </li>
                        ))}
                    </ul>
                    {selectedAvaria && (
                        <div className="avaria-overlay">
                            <div className="avaria-card-details">
                                <button className="close" onClick={handleCloseDetailCard}>
                                    <span>X</span>
                                </button>
                                <h2 className="titulo-detalhes">Detalhes da Avaria</h2>
                                <div className="avaria-detalhes">
                                    {detalhesOrdenados.map((key) => {
                                        if (key !== "id") {
                                            return (
                                                <div key={key} className="detalhe-item">
                                                    <span className="detalhe-label">{key.toUpperCase()}:</span> {selectedAvaria[key]}
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
