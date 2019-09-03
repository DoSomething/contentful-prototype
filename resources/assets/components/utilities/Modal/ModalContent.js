import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ModalContent = ({ children, onClose, className }) => (
  <div className={classnames('modal', className)}>
    {/* @TODO: Extract this 'ex button' into a utility component. */}
    <button type="button" className="modal__close" onClick={onClose}>
      &times;
    </button>

    {children}
  </div>
);

ModalContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalContent.defaultProps = {
  className: null,
};

export default ModalContent;
