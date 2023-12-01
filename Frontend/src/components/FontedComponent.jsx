// FontedComponent.jsx
import styled from 'styled-components';

const FontedComponent = styled.div`
  font-family: ${props => props.theme.fonts.main};
  // ... other styles
`;

export default FontedComponent;
