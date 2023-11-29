import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const getInitialState = () => ({
  userProfile: false,
  notification: false,
});

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#1E4DB7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(getInitialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...getInitialState(), [clicked]: true });

  return (
    <StateContext.Provider value={{
      currentColor,
      currentMode,
      activeMenu,
      screenSize,
      setScreenSize,
      handleClick,
      isClicked,
      initialState: getInitialState(),
      setIsClicked,
      setActiveMenu,
      setCurrentColor,
      setCurrentMode,
      setMode,
      setColor,
      themeSettings,
      setThemeSettings,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
