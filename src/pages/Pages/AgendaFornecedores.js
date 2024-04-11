import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../data/img/logotipo.png';

const AgendaFornecedor = () => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [comprador, setComprador] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [isLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('data');
    const savedHora = localStorage.getItem('hora');
    const savedComprador = localStorage.getItem('comprador');
    const savedFornecedor = localStorage.getItem('fornecedor');

    if (savedData !== null) {
      setData(savedData);
    }
    if (savedHora !== null) {
      setHora(savedHora);
    }
    if (savedComprador !== null) {
      setComprador(savedComprador);
    }
    if (savedFornecedor !== null) {
      setFornecedor(savedFornecedor);
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'data') {
      setData(value);
      localStorage.setItem('data', value);
    } else if (name === 'hora') {
      setHora(value);
      localStorage.setItem('hora', value);
    } else if (name === 'comprador') {
      setComprador(value);
      localStorage.setItem('comprador', value);
    } else if (name === 'fornecedor') {
      setFornecedor(value);
      localStorage.setItem('fornecedor', value);
    }
    localStorage.setItem(name, value);
  };

  const resetForm = () => {
    setHora('');
    setComprador('');
    setFornecedor('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('Data', data);
      formData.append('Hora', hora);
      formData.append('Comprador', comprador);
      formData.append('Fornecedor', fornecedor);

      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbyfzgPsemiVocIR12Z-D8STX0qNr2eXOOxZeLxSBELM3J0y7aZV-y-9QozjtzD_YQwf/exec',
        formData,
      );

      if (response.status === 200) {
        setSuccessMessage(response.data);
        resetForm();
        setIsSubmitted(true);
        localStorage.removeItem('hora');
        localStorage.removeItem('comprador');
        localStorage.removeItem('fornecedor');
      } else {
        throw new Error(
          'Erro ao enviar formulário. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setIsSubmitted(false);
    setSuccessMessage('');
  };

  return (
    <div className="containerAvarias">
      {isSubmitted && successMessage && (
        <div className="successMessage">
          <span>{successMessage}</span>
          <button type="button" onClick={handleCloseSuccessMessage}>
            OK
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <img src={logo} alt="Logo" className="logo-form" />
        <h1 className="titulo">Agenda São Roque</h1>
        <label htmlFor="data" className="form__label">
          data:
        </label>
        <input
          type="text"
          id="data"
          name="data"
          value={data}
          onChange={handleChange}
          className="form__input"
          onWheel={(e) => e.preventDefault()}
          required
        />
        <label htmlFor="hora" className="form__label">
          hora:
        </label>
        <input
          type="text"
          id="hora"
          name="hora"
          value={hora}
          onChange={handleChange}
          className="form__input"
          onWheel={(e) => e.preventDefault()}
          required
        />
        <label htmlFor="comprador" className="form__label">
          Selecione o Comprador:
        </label>
        <select
          id="comprador"
          value={comprador}
          onChange={(event) => setComprador(event.target.value)}
          className="form__input select"
          required
        >
          <option value="">Selecione o Comprador</option>
          <option value="SÉRGIO">Sérgio</option>
          <option value="SENA">Sena</option>
          <option value="MARIVONE">Marivone</option>
          <option value="JURANDIR">Jurandir</option>
          <option value="VITOR">Vitor</option>
          <option value="LUCAS">Lucas</option>
        </select>

        <label htmlFor="fornecedor" className="form__label">
          Fornecedor:
        </label>
        <input
          type="text"
          id="fornecedor"
          name="fornecedor"
          value={fornecedor}
          onChange={handleChange}
          className="form__input"
          onWheel={(e) => e.preventDefault()}
          required
        />

        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading || isSending || isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default AgendaFornecedor;
