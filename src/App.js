import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import { Navbar, Sidebar, ThemeSettings } from './components';
import './App.css';
import { Winthor, Rebaixa, NotFound, Encarte, Agenda, Comprador, Analise, Documentos, Sergio, Vitor, Marivone, Sena, Jurandir, RebaixaEnvio } from './pages';

const App = () => {
  const { currentMode, activeMenu, themeSettings } = useStateContext();

  const isDarkMode = currentMode === 'Dark';
  const isMenuActive = activeMenu;

  const isRebaixaEnvioPage = window.location.pathname === '/rebaixa-envio' || window.location.pathname === '/';

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <BrowserRouter>
        <div className={`flex relative ${isDarkMode ? 'dark:bg-main-dark-bg' : 'bg-main-bg'}`}>
          <div className={`w-${isMenuActive && !isRebaixaEnvioPage ? '72 fixed' : '0'} sidebar ${isDarkMode ? 'dark:bg-secondary-dark-bg' : ''} bg-white`}>
            {isRebaixaEnvioPage ? null : <Sidebar />}
          </div>
          <div className={`w-full min-h-screen flex-2 ${isMenuActive && !isRebaixaEnvioPage ? 'dark:bg-main-dark-bg bg-main-bg md:ml-72' : 'bg-main-bg dark:bg-main-dark-bg'}`}>
            <div className={`fixed md:static bg-main-bg ${isMenuActive && !isRebaixaEnvioPage ? 'dark:bg-main-dark-bg' : ''} navbar w-full`}>
              {isRebaixaEnvioPage ? null : <Navbar />}
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                <Route path="/sergio" element={<Sergio />} />
                <Route path="/marivone" element={<Marivone />} />
                <Route path="/vitor" element={<Vitor />} />
                <Route path="/sena" element={<Sena />} />
                <Route path="/jurandir" element={<Jurandir />} />
                <Route path="/comprador" element={<Comprador />} />
                <Route path="/analise" element={<Analise />} />
                <Route path="/documentos" element={<Documentos />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/rebaixa" element={<Rebaixa />} />
                <Route path="/rebaixa-envio" element={<RebaixaEnvio />} />
                <Route path="/encarte" element={<Encarte />} />
                <Route path="/winthor" element={<Winthor />} />
                <Route path="/" element={<Comprador />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
