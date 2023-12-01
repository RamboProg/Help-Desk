// ColoredComponent.jsx
import styled from 'styled-components';

const ColoredComponent = styled.div`
  background-color: ${props => props.theme.colors.primary};
  // ... other styles
`;

export default ColoredComponent;
