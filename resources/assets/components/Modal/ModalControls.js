import React from 'react';
import PropTypes from 'prop-types';

const ModalControls = ({ children, onClose, className }) => (
  <div style={{ position: 'relative' }} className={className}>
    <button className="card__exit -floating" onClick={onClose}>
      &times;
    </button>
    {children}
  </div>
);

ModalControls.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalControls.defaultProps = {
  className: null,
};

export default ModalControls;
