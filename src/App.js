import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import { Navbar, Sidebar, ThemeSettings } from './components';
import './App.css';
import Winthor from './pages/Winthor/Winthor';
import Rebaixa from './pages/Rebaixa/Rebaixa';
import NotFound from './pages/Notfound/NotFund';
import Encarte from './pages/Encarte/Encarte';
import Agenda from './pages/Agenda/Agenda';
import Comprador from './pages/Comprador/Comprador';
import Analise from './pages/Analise/Analise';
import Contratos from './pages/Contratos/Contratos';

import Sergio from './pages/Compradores/Sergio/Sergio';
import Vitor from './pages/Compradores/Vitor/Vitor';
import Marivone from './pages/Compradores/Marivone/Marivone';
import Sena from './pages/Compradores/Sena/Sena';
import Jurandir from './pages/Compradores/Jurandir/Jurandir';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
                : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* compradores */}
                <Route path="/sergio" element={<Sergio />} />
                <Route path="/marivone" element={<Marivone />} />
                <Route path="/vitor" element={<Vitor />} />
                <Route path="/sena" element={<Sena />} />
                <Route path="/jurandir" element={<Jurandir />} />

                {/* dashboard */}
                <Route path="/" element={<Comprador />} />
                <Route path="/comprador" element={<Comprador />} />
                <Route path="/analise" element={<Analise />} />

                {/* pages */}
                <Route path="/contratos" element={<Contratos />} />

                {/* apps */}
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/rebaixa" element={<Rebaixa />} />
                <Route path="/encarte" element={<Encarte />} />
                <Route path="/winthor" element={<Winthor />} />

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
