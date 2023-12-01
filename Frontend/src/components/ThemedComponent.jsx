// ThemedComponent.jsx
import styled from 'styled-components';

const ThemedComponent = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.fonts.main};
  // ... other styles
`;

export default ThemedComponent;
