// ThemedComponent.jsx
//import styled from 'styled-components';
import { useTheme } from './ThemeProvider';


const ThemedComponent = () => {
  const { theme } = useTheme();

  return (
    <div className={`bg-${theme}-background text-${theme}-text`}>
      {/* Your component content */}
    </div>
  );
};

export default ThemedComponent;
