// App.jsx
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import themes from './themeConfig';
import ThemedComponent from './ThemedComponent';

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const changeTheme = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <div>
        <ThemedComponent>
          This is a themed component.
        </ThemedComponent>
        
        <div>
          <button onClick={() => changeTheme('default')}>Default Theme</button>
          <button onClick={() => changeTheme('dark')}>Dark Theme</button>
          <button onClick={() => changeTheme('light')}>Light Theme</button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
