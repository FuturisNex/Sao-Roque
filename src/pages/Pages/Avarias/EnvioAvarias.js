import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/forms.css';
import Cookies from 'js-cookie';
import logo from '../../../data/img/logotipo.png';
import fornecedorData from '../../../data/fornecedores.json';

const FormPage = () => {
  const [responsavel, setResponsavel] = useState('');
  const [filial, setFilial] = useState('');
  const [cod, setCod] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
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
    Cookies.set('responsavel', responsavel);
    Cookies.set('filial', filial);
  }, [responsavel, filial]);

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
    const savedResponsavel = Cookies.get('responsavel');
    const savedFilial = Cookies.get('filial');

    if (savedResponsavel) {
      setResponsavel(savedResponsavel);
    }

    if (savedFilial) {
      setFilial(savedFilial);
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'cod') {
      setCod(value);
    } else if (name === 'fornecedor') {
      setFornecedor(value);
    } else if (name === 'tipo') {
      setTipo(value);
    } else if (name === 'quantidade') {
      setQuantidade(value);
    } else if (name === 'vlnota') {
      setVlnota(value);
    } else if (name === 'nota') {
      setNota(value);
    } else if (name === 'obs') {
      setObs(value);
    }
  };

  const resetForm = () => {
    setCod('');
    setFornecedor('');
    setTipo('');
    setQuantidade('');
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
      formData.append('Filial', filial);
      formData.append('Cod', cod);
      formData.append('Fornecedor', fornecedor);
      formData.append('Tipo', tipo);
      formData.append('Quantidade', quantidade);
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
    <div className="containerForms">
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

        <label htmlFor="responsavel" className="form__label">
          Seu Primeiro Nome:
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
          <option value="11">Tomé de Souza</option>
          <option value="2">Castro Alves</option>
          <option value="3">Tomba</option>
          <option value="4">Fraga Maia</option>
          <option value="5">Artemia Pires</option>
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

        <label htmlFor="quantidade" className="form__label">
          Quantidade:
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

        <label htmlFor="obs" className="form__label">
          Informações Adicionais:
        </label>
        <select
          id="obs"
          value={obs}
          onChange={(event) => setTipo(event.target.value)}
          className="form__input select"
          required
        >
          <option value="">Informação adicional</option>
          <option value="Feito a rebaixa mas não vendeu tudo">
            Feito a rebaixa mas não vendeu tudo
          </option>
          <option value="Encontrado Vencido">
            Encontrado Vencido, não enviado para rebaixa
          </option>
          <option value="Avariado Loja">Avariado Loja</option>
        </select>

        <button
          type="submit"
          className="form__button"
          disabled={isLoading || isSending || isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default FormPage;
