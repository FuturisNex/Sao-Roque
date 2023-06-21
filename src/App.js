import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
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

import Adauto from './pages/Compradores/Adauto/Adauto';
import Jovita from './pages/Compradores/Jovita/Jovita';
import Marivone from './pages/Compradores/Marivone/Marivone';
import Sena from './pages/Compradores/Sena/Sena';

import notificacaoedit from './components/NotificationControl';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

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
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
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
                <Route path="/adauto" element={<Adauto />} />
                <Route path="/marivone" element={<Marivone />} />
                <Route path="/neta" element={<Jovita />} />
                <Route path="/sena" element={<Sena />} />

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

                <Route path="/notificacaoedit" element={<notificacaoedit />} />

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
