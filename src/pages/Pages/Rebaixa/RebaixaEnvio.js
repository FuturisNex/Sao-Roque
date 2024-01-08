import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './forms.css';
import axios from 'axios';
import logo from '../../../data/img/logotipo.png';
import productsData from '../../../data/data.json';

const RebaixaEnvio = () => {
  const [responsavel, setResponsavel] = useState('');
  const [filial, setFilial] = useState('');
  const [cod, setCod] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [sugestao, setSugestao] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [previousCod, setPreviousCod] = useState('');
  const [isSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setCod('');
    setDescricao('');
    setQuantidade('');
    setSugestao('');
    setData('');
  };

  const handleChangeResponsavel = (event) => {
    setResponsavel(event.target.value.toUpperCase());
  };

  const fetchProductDescription = () => {
    try {
      const matchingProduct = productsData.find(
        (product) => product.Codigo === parseInt(cod, 10),
      );

      if (matchingProduct) {
        return matchingProduct.Descricao;
      }

      return '';
    } catch (error) {
      setErrorMessage(
        'Erro ao buscar a descrição do produto. Tente novamente mais tarde.',
      );
      return null;
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
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
      if (new Date(data) < new Date()) {
        setErrorMessage('Não é permitido adicionar um produto com a data já vencida.');
        return;
      }

      const formData = new FormData();
      formData.append('Responsavel', responsavel);
      formData.append('Filial', filial);
      formData.append('Cod', cod);
      formData.append('Descricao', descricao);
      formData.append('Quantidade', quantidade);
      formData.append('Sugestao', sugestao);
      formData.append('Data', formatDate(data));

      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbzgryf5YTtOZjjxPKPdsBlXGHxW2tf8f9VwZTnZtqYW4ZiREno8St9evy9lYHJBpxXR/exec',
        formData,
      );

      if (response.status === 200) {
        setSuccessMessage(response.data);
        resetForm();
        setIsSubmitted(true);
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

  useEffect(() => {
    const clearErrorMessage = () => {
      setErrorMessage('');
    };

    if (errorMessage) {
      const timeoutId = setTimeout(clearErrorMessage, 5000);

      return () => clearTimeout(timeoutId);
    }
    return () => {};
  }, [errorMessage]);

  useEffect(() => {
    const fetchData = () => {
      if (cod !== '' && cod !== previousCod) {
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        const description = fetchProductDescription();
        setDescricao(description);
        setPreviousCod(cod);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cod, previousCod]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'cod') {
      setCod(value);
    } else if (name === 'descricao') {
      setDescricao(value);
    } else if (name === 'quantidade') {
      setQuantidade(value);
    } else if (name === 'sugestao') {
      const formattedValue = value
        .replace('.', ',')
        .replace(/[^0-9,]/g, '')
        .replace(/(,.*),/g, '$1')
        .replace(/,(\d{3})/g, '.$1');
      setSugestao(formattedValue);
    } else if (name === 'data') {
      setData(value);
    }
    if (name === 'data' && new Date(value) < new Date()) {
      setErrorMessage(
        'Não é permitido adicionar um produto com a data já vencida.',
      );
    }

    if (name === 'data' && value) {
      const currentDate = new Date();
      const inputDate = new Date(value);
      const differenceInDays = Math.ceil(
        (inputDate - currentDate) / (1000 * 60 * 60 * 24),
      );

      if (differenceInDays <= 0) {
        setErrorMessage(
          'Não é permitido adicionar um produto com a data já vencida.',
        );
      } else if (differenceInDays <= 5) {
        setErrorMessage(
          'Aviso importante: Se possivel, enviar os próximos itens com antecedência de pelo menos 5 dias!',
        );
      } else {
        setErrorMessage('');
      }
    }
    return null;
  };

  const handleCloseSuccessMessage = () => {
    setIsSubmitted(false);
    setSuccessMessage('');
  };

  const handleOpenExcelLink = () => {
    window.open(
      'https://docs.google.com/spreadsheets/d/1PEBDxVZzOwsYiEcu7iCGHSMhyuGHsFJTDALKrXlaWT4/edit?usp=sharing',
      '_blank',
    );
  };
  const handleOpenExcelLink1 = () => {
    window.open(
      'https://lookerstudio.google.com/reporting/b23bcb9e-ef70-4bd6-9fae-8d33270c456c',
      '_blank',
    );
  };

  return (
    <div className="containerForms">
      <Helmet>
        <link rel="manifest" href="/rebaixa-envio-manifest.json" />
      </Helmet>
      {isSubmitted && successMessage && (
        <div className="successMessage">
          <span>{successMessage}</span>
          <button type="button" onClick={handleCloseSuccessMessage}>OK</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <img src={logo} alt="Logo" className="logo-form" />

        <label htmlFor="responsavel" className="form__label">
          Seu Nome
        </label>
        <input
          type="text"
          id="responsavel"
          value={responsavel}
          onChange={handleChangeResponsavel}
          className="form__input"
          required
        />

        <label htmlFor="filial" className="form__label">
          Sua Loja
        </label>
        <select
          id="filial"
          value={filial}
          onChange={(event) => setFilial(event.target.value)}
          className="form__input select"
          required
        >
          <option value="">Selecione a Loja</option>
          <option value="Santa Mônica">Santa Mônica</option>
          <option value="Tomé de Souza">Tomé de Souza</option>
          <option value="Castro Alves">Castro Alves</option>
          <option value="Fraga Maia">Fraga Maia</option>
          <option value="Artemia Pires">Artemia Pires</option>
          <option value="Artemia Express">Artemia Express</option>
          <option value="Calamar Express">Calamar Express</option>
        </select>

        <label htmlFor="cod" className="form__label">
          Código Interno do Produto
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

        <label htmlFor="descricao" className="form__label">
          Descrição do Produto
        </label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={handleChange}
          className="form__input"
          required
        />

        <label htmlFor="quantidade" className="form__label">
          Quantidade a Vencer
        </label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          value={quantidade}
          onChange={handleChange}
          className="form__input"
          required
        />

        <label htmlFor="sugestao" className="form__label">
          Sugestão de Preço
        </label>
        <input
          type="text"
          id="sugestao"
          name="sugestao"
          value={sugestao}
          onChange={handleChange}
          className="form__input"
        />

        <label htmlFor="data" className="form__label">
          Data de Vencimento
        </label>
        <input
          type="date"
          id="data"
          name="data"
          value={data}
          onChange={handleChange}
          className="form__input"
          required
        />

        <button
          type="submit"
          className="form__button"
          disabled={isLoading || isSending || isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        <button
          type="button"
          className="form__ver"
          onClick={handleOpenExcelLink}
        >
          Lista
        </button>
        <button
          type="button"
          className="form__ver1"
          onClick={handleOpenExcelLink1}
        >
          Acompanhamento
        </button>
      </form>
    </div>
  );
};

export default RebaixaEnvio;
