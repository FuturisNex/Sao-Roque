import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import { Navbar, Sidebar, ThemeSettings } from './components';
import './App.css';
import { Winthor, Rebaixa, NotFound, Encarte, Agenda, Comprador, Analise, Documentos, Sergio, Vitor, Marivone, Sena, Jurandir } from './pages';

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

  const isDarkMode = currentMode === 'Dark';
  const isMenuActive = activeMenu;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <BrowserRouter>
        <div className={`flex relative ${isDarkMode ? 'dark:bg-main-dark-bg' : 'bg-main-bg'}`}>
          <div className={`w-${isMenuActive ? '72 fixed' : '0'} sidebar ${isDarkMode ? 'dark:bg-secondary-dark-bg' : ''} bg-white`}>
            <Sidebar />
          </div>
          <div className={`${isMenuActive ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72' : 'bg-main-bg dark:bg-main-dark-bg'
          } w-full min-h-screen flex-2`}>
            <div className={`fixed md:static bg-main-bg ${isDarkMode ? 'dark:bg-main-dark-bg' : ''} navbar w-full`}>
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
                <Route path="/documentos" element={<Documentos />} />

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
