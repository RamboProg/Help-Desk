// ThemeProvider.js
import{ createContext, useContext, useState } from 'react';

const ThemeContext = createContext();
import PropTypes from 'prop-types'; // Import prop-types module


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default'); // default theme

  const switchTheme = (newTheme) => {
    // Implement logic to update the theme in the backend and apply it to the UI
    // ...

    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Add prop types validation
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };
