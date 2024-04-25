import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import { Navbar, Sidebar, ThemeSettings } from './components';
import './App.css';
import {
  Winthor,
  AgendaFornecedor,
  Rebaixa,
  NotFound,
  Encarte,
  Agenda,
  Comprador,
  Analise,
  Documentos,
  Sergio,
  Vitor,
  Marivone,
  Sena,
  Jurandir,
  RebaixaEnvio,
  EnvioAvarias,
  ListaAvarias,
  AvariaMenu,
} from './pages';

const App = () => {
  const { currentMode, themeSettings } = useStateContext();

  const isDarkMode = currentMode === 'Dark';

  const allowedPaths = [
    '/comercial/comprador/sergio',
    '/comercial/comprador/marivone',
    '/comercial/comprador/vitor',
    '/comercial/comprador/sena',
    '/comercial/comprador/jurandir',
    '/comercial/comprador',
    '/comercial/analise',
    '/comercial/documentos',
    '/comercial/agenda',
    '/comercial/rebaixa',
    '/comercial/avarias',
    '/comercial/encarte',
    '/comercial/winthor',
    '/validades/rebaixa-envio',
  ];

  const isAllowedPath = allowedPaths.some((path) => window.location.pathname.startsWith(path));

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <BrowserRouter>
        <div className={`flex relative ${isDarkMode ? 'dark:bg-main-dark-bg' : 'bg-main-bg'}`}>
          <div className={`w-${isAllowedPath ? '72 fixed' : '0'} sidebar ${isDarkMode ? 'dark:bg-secondary-dark-bg' : ''} bg-white`}>
            {isAllowedPath && <Sidebar />}
          </div>
          <div className={`w-full min-h-screen flex-2 ${isAllowedPath ? 'dark:bg-main-dark-bg bg-main-bg md:ml-72' : 'bg-main-bg dark:bg-main-dark-bg'}`}>
            <div className={`fixed md:static bg-main-bg ${isAllowedPath ? 'dark:bg-main-dark-bg' : ''} navbar w-full`}>
              {isAllowedPath && <Navbar />}
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                <Route path="/comercial/comprador/sergio" element={<Sergio />} />
                <Route path="/comercial/comprador/marivone" element={<Marivone />} />
                <Route path="/comercial/comprador/vitor" element={<Vitor />} />
                <Route path="/comercial/comprador/sena" element={<Sena />} />
                <Route path="/comercial/comprador/jurandir" element={<Jurandir />} />
                <Route path="/comercial/comprador" element={<Comprador />} />
                <Route path="/comercial/analise" element={<Analise />} />
                <Route path="/comercial/documentos" element={<Documentos />} />
                <Route path="/comercial/agenda" element={<Agenda />} />
                <Route path="/agenda/fornecedor" element={<AgendaFornecedor />} />
                <Route path="/comercial/rebaixa" element={<Rebaixa />} />
                <Route path="/comercial/avarias" element={<AvariaMenu />} />
                <Route path="/comercial/encarte" element={<Encarte />} />
                <Route path="/comercial/winthor" element={<Winthor />} />
                <Route path="/validades/rebaixa-envio" element={<RebaixaEnvio />} />
                <Route path="/avarias/avarias-lista" element={<ListaAvarias />} />
                <Route path="/avarias/avarias-home" element={<EnvioAvarias />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Analytics />
            </div>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
