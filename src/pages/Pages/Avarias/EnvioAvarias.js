import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/forms.css';
import { Link } from 'react-router-dom';
import logo from '../../../data/img/logotipo.png';
import fornecedorData from '../../../data/fornecedores.json';

const FormPage = () => {
  const [responsavel, setResponsavel] = useState('');
  const [comprador, setComprador] = useState('');
  const [filial, setFilial] = useState('');
  const [cod, setCod] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [tipo, setTipo] = useState('');
  const [volume, setVolume] = useState('');
  const [nota, setNota] = useState('');
  const [vlnota, setVlnota] = useState('');
  const [obs, setObs] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [previousCod, setPreviousCod] = useState('');
  const [isSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeResponsavel = (event) => {
    setResponsavel(event.target.value.toUpperCase());
  };

  const fetchProductDescription = () => {
    try {
      const matchingProduct = fornecedorData.find(
        (product) => product.Codigo === parseInt(cod, 10),
      );

      if (matchingProduct) {
        return matchingProduct.Fornecedor;
      }

      return '';
    } catch (error) {
      setErrorMessage(
        'Erro ao buscar a razão social do fornecedor. Tente novamente mais tarde.',
      );
    }
  };

  useEffect(() => {
    const fetchData = () => {
      if (cod !== '' && cod !== previousCod) {
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        const description = fetchProductDescription();
        setFornecedor(description);
        setPreviousCod(cod);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cod, previousCod]);

  useEffect(() => {
    const savedResponsavel = localStorage.getItem('responsavel');
    const savedFilial = localStorage.getItem('filial');
    const savedComprador = localStorage.getItem('comprador');
    const savedCod = localStorage.getItem('cod');
    const savedFornecedor = localStorage.getItem('fornecedor');
    const savedTipo = localStorage.getItem('tipo');
    const savedVolume = localStorage.getItem('volume');
    const savedNota = localStorage.getItem('nota');
    const savedVlnota = localStorage.getItem('vlnota');
    const savedObs = localStorage.getItem('obs');

    if (savedResponsavel !== null) {
      setResponsavel(savedResponsavel);
    }
    if (savedFilial !== null) {
      setFilial(savedFilial);
    }
    if (savedComprador !== null) {
      setComprador(savedComprador);
    }
    if (savedCod !== null) {
      setCod(savedCod);
    }
    if (savedFornecedor !== null) {
      setFornecedor(savedFornecedor);
    }
    if (savedTipo !== null) {
      setTipo(savedTipo);
    }
    if (savedVolume !== null) {
      setVolume(savedVolume);
    }
    if (savedNota !== null) {
      setNota(savedNota);
    }
    if (savedVlnota !== null) {
      setVlnota(savedVlnota);
    }
    if (savedObs !== null) {
      setObs(savedObs);
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'cod') {
      setCod(value);
      localStorage.setItem('cod', value);
    } else if (name === 'responsavel') {
      setResponsavel(value);
      localStorage.setItem('responsavel', value);
    } else if (name === 'comprador') {
      setComprador(value);
      localStorage.setItem('comprador', value);
    } else if (name === 'fornecedor') {
      setFornecedor(value);
      localStorage.setItem('fornecedor', value);
    } else if (name === 'tipo') {
      setTipo(value);
      localStorage.setItem('tipo', value);
    } else if (name === 'volume') {
      setVolume(value);
      localStorage.setItem('volume', value);
    } else if (name === 'vlnota') {
      setVlnota(value);
      localStorage.setItem('vlnota', value);
    } else if (name === 'nota') {
      setNota(value);
      localStorage.setItem('nota', value);
    } else if (name === 'obs') {
      setObs(value);
      localStorage.setItem('obs', value);
    }
  };

  const resetForm = () => {
    setResponsavel('');
    setComprador('');
    setCod('');
    setFornecedor('');
    setTipo('');
    setVolume('');
    setVlnota('');
    setNota('');
    setObs('');
  };

  const handleVlnotaChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9,]/g, '');
    setVlnota(sanitizedValue);
  };

  const formatCurrency = (value) => {
    const formattedValue = parseFloat(
      value.replace(',', '.'),
      10,
    ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formattedValue;
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
      formData.append('Responsavel', responsavel);
      formData.append('Comprador', comprador);
      formData.append('Filial', filial);
      formData.append('Cod', cod);
      formData.append('Fornecedor', fornecedor);
      formData.append('Tipo', tipo);
      formData.append('Volume', volume);
      formData.append('Nota', nota);
      formData.append('Vlnota', formatCurrency(vlnota));
      formData.append('Obs', obs);

      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbyRqcYz2d1f3Hjba5nZPWd3VNZ4gSnZ3uLn1JmX0M_H27zdfR_zbm3zdSarOji0XS_T/exec',
        formData,
      );

      if (response.status === 200) {
        setSuccessMessage(response.data);
        resetForm();
        setIsSubmitted(true);
        localStorage.removeItem('responsavel');
        localStorage.removeItem('comprador');
        localStorage.removeItem('filial');
        localStorage.removeItem('cod');
        localStorage.removeItem('fornecedor');
        localStorage.removeItem('tipo');
        localStorage.removeItem('nota');
        localStorage.removeItem('vlnota');
        localStorage.removeItem('obs');
      } else {
        throw new Error(
          'Erro ao enviar formulário. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
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
        <h1 className="titulo">Painel de Envio Avarias</h1>
        <label htmlFor="responsavel" className="form__label">
          Nome do Responsavel:
        </label>
        <input
          type="text"
          id="responsavel"
          value={responsavel}
          onChange={handleChangeResponsavel}
          className="form__input"
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

        <label htmlFor="filial" className="form__label">
          Selecione a loja:
        </label>
        <select
          id="filial"
          value={filial}
          onChange={(event) => setFilial(event.target.value)}
          className="form__input select"
          required
        >
          <option value="">Selecione a Loja</option>
          <option value="1">Santa Mônica</option>
          <option value="2">Castro Alves</option>
          <option value="4">Fraga Maia</option>
          <option value="5">Artemia Pires</option>
          <option value="11">Tomé de Souza</option>
          <option value="13">Artemia Express</option>
          <option value="14">Calamar Express</option>
        </select>

        <label htmlFor="cod" className="form__label">
          Código do Fornecedor:
        </label>
        <input
          type="number"
          id="cod"
          name="cod"
          value={cod}
          onChange={handleChange}
          className="form__input"
          required
        />

        <label htmlFor="fornecedor" className="form__label">
          Razão Social do Fornecedor:
        </label>
        <input
          type="text"
          id="fornecedor"
          name="fornecedor"
          value={fornecedor}
          onChange={handleChange}
          className="form__input"
          required
        />

        <label htmlFor="tipo" className="form__label">
          Selecione o Tipo:
        </label>
        <select
          id="tipo"
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
          className="form__input select"
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="Validade | Vencido">Validade | Vencido</option>
          <option value="Avarias | Danificado | Imprópio para Consumo">
            Avarias | Danificado | Imprópio para Consumo
          </option>
        </select>

        <label htmlFor="nota" className="form__label">
          Nº da Nota:
        </label>
        <input
          type="number"
          id="nota"
          name="nota"
          value={nota}
          onChange={handleChange}
          className="form__input"
          required
        />

        <label htmlFor="vlnota" className="form__label">
          Valor da Nota:
        </label>
        <input
          type="text"
          id="vlnota"
          name="vlnota"
          value={vlnota}
          onChange={handleVlnotaChange}
          className="form__input"
        />

        <label htmlFor="volume" className="form__label">
          Volume:
        </label>
        <input
          type="number"
          id="volume"
          name="volume"
          value={volume}
          onChange={handleChange}
          className="form__input"
          required
        />

        <div className="options">
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || isSending || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
          <Link to="/avarias/avarias-lista" className="option">
            <button type="button" className="btn-secondary">
              Lista
            </button>
          </Link>
        </div>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default FormPage;
