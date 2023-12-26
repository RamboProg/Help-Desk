// AppearanceContext.js
import React, { createContext, useState } from 'react';

export const AppearanceContext = createContext();

export const AppearanceContextProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('Light'); // default theme
  const [logoPath, setLogoPath] = useState(''); // default logo path
  
  return (
    <AppearanceContext.Provider value={{ themeName, setThemeName, logoPath, setLogoPath }}>
      {children}
    </AppearanceContext.Provider>
  );
};

export default AppearanceContext;
