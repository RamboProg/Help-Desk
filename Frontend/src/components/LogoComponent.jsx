import PropTypes from 'prop-types';

const LogoComponent = ({ logoUrl }) => (
  <img src={logoUrl} alt="Organization Logo" />
);

LogoComponent.propTypes = {
  logoUrl: PropTypes.string.isRequired,
};

export default LogoComponent;
