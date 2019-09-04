import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ModalContent = ({ children, onClose, className, closeFooterText }) => (
  <div className={classnames('modal', className)}>
    <button type="button" className="modal__close" onClick={onClose}>
      &times;
    </button>

    {children}

    {closeFooterText ? (
      <button type="button" className="text-white" onClick={onClose}>
        {closeFooterText}
      </button>
    ) : null}
  </div>
);

ModalContent.propTypes = {
  closeFooterText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalContent.defaultProps = {
  className: null,
  closeFooterText: null,
};

export default ModalContent;
