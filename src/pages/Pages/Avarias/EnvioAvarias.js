import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/forms.css';
import { Link } from 'react-router-dom';
import fornecedorData from '../../../data/fornecedores.json';

const FormPage = () => {
  const [responsavel, setResponsavel] = useState('');
  const [comprador, setComprador] = useState('');
  const [filial, setFilial] = useState('');
  const [cod, setCod] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [departamento, setDepartamento] = useState('');
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
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const fetchProductDescription = () => {
    try {
      const matchingProduct = fornecedorData.Fornecedores.find(
        (product) => product.Codigo === parseInt(cod, 10),
      );

      if (matchingProduct) {
        setComprador(matchingProduct.Comprador || '');
        return matchingProduct.Fornecedor || '';
      // eslint-disable-next-line no-else-return
      } else {
        setComprador('');
        return '';
      }
    } catch (error) {
      setErrorMessage(
        'Erro ao buscar a razão social do fornecedor. Tente novamente mais tarde.'
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (cod !== '' && cod !== previousCod) {
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
          const description = fetchProductDescription();
          setFornecedor(description);
          setPreviousCod(cod);
        } catch (error) {
          setErrorMessage(
            'Erro ao buscar a razão social do fornecedor. Tente novamente mais tarde.'
          );
        } finally {
          setIsLoading(false);
        }
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
    const savedDepartamento = localStorage.getItem('departamento');
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
    if (savedDepartamento !== null) {
      setDepartamento(savedTipo);
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
    } else if (name === 'departamento') {
      setDepartamento(value);
      localStorage.setItem('departamento', value);
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
    localStorage.setItem(name, value);
  };

  const resetForm = () => {
    setResponsavel('');
    setComprador('');
    setCod('');
    setFornecedor('');
    setDepartamento('');
    setTipo('');
    setVolume('');
    setVlnota('');
    setNota('');
    setObs('');
  };

  const handleChangeResponsavel = (event) => {
    setResponsavel(event.target.value.toUpperCase());
    const { name, value } = event.target;
    handleChange({ target: { name, value: value.toUpperCase() } });
  };

  const handleChangeObs = (event) => {
    setObs(event.target.value.toUpperCase());
    const { name, value } = event.target;
    handleChange({ target: { name, value: value.toUpperCase() } });
  };

  const handleVlnotaChange = (event) => {
    const { name, value } = event.target;
    handleChange({ target: { name, value: value.toUpperCase() } });
    const sanitizedValue = value.replace(/[^0-9,]/g, '');
    setVlnota(sanitizedValue);
  };

  const handleVolumeChange = (event) => {
    const { name, value } = event.target;
    handleChange({ target: { name, value: value.toUpperCase() } });
    const sanitizedValue = value.replace(/[^0-9,]/g, '');
    setVolume(sanitizedValue);
  };

  const handleNotaChange = (event) => {
    const { name, value } = event.target;
    handleChange({ target: { name, value: value.toUpperCase() } });
    const sanitizedValue = value.replace(/[^0-9,]/g, '');
    setNota(sanitizedValue);
  };

  const handleCompradorChange = (event) => {
    const { name, value } = event.target;
    handleChange({ target: { name, value: value.toUpperCase() } });
    setCod(value);
  };

  const formatCurrency = (value) => {
    const formattedValue = parseFloat(
      value.replace(',', '.'),
      10,
    ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formattedValue;
  };

  const handleSubmit = async () => {
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
      formData.append('Departamento', departamento);
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
        localStorage.removeItem('departamento');
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
      // eslint-disable-next-line no-console
      console.error(error);
      setErrorMessage(error.response ? error.response.data : 'Erro ao enviar formulário. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setIsSubmitted(false);
    setSuccessMessage('');
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmSubmission = () => {
    handleSubmit();
    handleCloseConfirmation();
  };

  return (
    <div className="containerAvarias">
      <Link to="/avarias/avarias-lista" className="back-button">
        Lista de Avarias
      </Link>
      {isSubmitted && successMessage && (
        <div className="successMessage">
          <span>{successMessage}</span>
          <button type="button" onClick={handleCloseSuccessMessage}>
            OK
          </button>
        </div>
      )}

      {isConfirmationOpen && (
        <div className={`confirmationModal ${isConfirmationOpen ? '' : 'hidden'}`}>
          <p>Deseja realmente enviar o formulário?</p>
          <div className="confirmationModal-buttons">
            <button
              type="button"
              onClick={handleConfirmSubmission}
              className="confirmationModal-button confirm"
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={handleCloseConfirmation}
              className="confirmationModal-button cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOpenConfirmation();
        }}
        className="form"
      >
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
          placeholder="Seu nome"
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
          <option value="1">01  - Santa Mônica</option>
          <option value="2">02  - Castro Alves</option>
          <option value="4">04  - Fraga Maia</option>
          <option value="5">05  - Artemia Pires</option>
          <option value="11">11 - Tomé de Souza</option>
          <option value="13">13 - Calamar Express</option>
          <option value="14">14 - Artemia Express</option>
          <option value="15">15 - santo Estevão</option>
        </select>

        <label htmlFor="cod" className="form__label">
          Código do Fornecedor:
        </label>
        <input
          type="text"
          id="cod"
          name="cod"
          value={cod}
          onChange={handleCompradorChange}
          className="form__input"
          placeholder="Código do Fornecedor"
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
          placeholder="Nome do Fornecedor"
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
          <option value="Rocha">Rocha</option>
          <option value="Vitor">Vitor</option>
          <option value="Sergio">Sergio</option>
          <option value="Carina">Carina</option>
          <option value="Jurandir">Jurandir</option>
          <option value="Cassio">Cassio</option>
          <option value="Lucas">Lucas</option>
        </select>

        <label htmlFor="departamento" className="form__label">
          Selecione o Departamento:
        </label>
        <select
          id="departamento"
          value={departamento}
          onChange={(event) => setDepartamento(event.target.value)}
          className="form__input select"
          required
        >
          <option value="">Selecione o departamento</option>
          <option value="Pet">Pet</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Mercearia">Mercearia</option>
          <option value="Perfumaria">Perfumaria</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Utilidades">Utilidades</option>
          <option value="Frios e Laticinios">Frios e Laticinios</option>
          <option value="Congelados e Prato Pronto">Congelados e Prato Pronto</option>
          <option value="Salgados, Defumados e Embutidos">Salgados, Defumados e Embutidos</option>
        </select>

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
          <option value="Avarias Hortis">Avarias Hortis</option>
          <option value="Validade | Vencido">Validade | Vencido</option>
          <option value="Avarias | Danificado | Imprópio para Consumo">
            Avarias | Danificado | Imprópio para Consumo
          </option>
        </select>

        <label htmlFor="nota" className="form__label">
          Nº da Nota:
        </label>
        <input
          type="text"
          id="nota"
          name="nota"
          value={nota}
          onChange={handleNotaChange}
          className="form__input"
          onWheel={(e) => e.preventDefault()}
          placeholder="Número da Nota"
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
          placeholder="Valor da Nota"
          required
        />

        <label htmlFor="volume" className="form__label">
          Volume:
        </label>
        <input
          type="text"
          id="volume"
          name="volume"
          value={volume}
          onChange={handleVolumeChange}
          className="form__input"
          onWheel={(e) => e.preventDefault()}
          placeholder="Volume da Nota"
          required
        />

        <label htmlFor="obs" className="form__label">
          Observações:
        </label>
        <input
          type="text"
          id="obs"
          name="obs"
          value={obs}
          onChange={handleChangeObs}
          className="form__input"
          placeholder="Sua Observação"
          onWheel={(e) => e.preventDefault()}
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

export default FormPage;
