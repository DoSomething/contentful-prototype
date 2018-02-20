import React from 'react';
import PropTypes from 'prop-types';

const ModalControls = ({ children, onClose }) => (
  <div style={{ position: 'relative' }}>
    <button className="card__exit -floating" onClick={onClose}>&times;</button>
    { children }
  </div>
);

ModalControls.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalControls;
