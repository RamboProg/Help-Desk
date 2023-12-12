// App.jsx
import { useState } from 'react';
import { createRoot } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import themes from './config/themeConfig';
import ThemedComponent from './components/ThemedComponent';

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const changeTheme = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <div>
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>
        
        <div>
          <button onClick={() => changeTheme('default')}>Default Theme</button>
          <button onClick={() => changeTheme('dark')}>Dark Theme</button>
          <button onClick={() => changeTheme('light')}>Light Theme</button>
        </div>
      </div>
    </ThemeProvider>
  );
};

const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(<App />);
export default App; // Export the component
