import React from 'react';
import PropTypes from 'prop-types';

import './cta-popover.scss';

const CtaPopover = ({ content, handleClose, title, children }) => {
  return (
    <div className="cta-popover p-3 bordered rounded">
      <button
        type="button"
        className="modal__close -white"
        onClick={handleClose}
      >
        &times;
      </button>
      <h3 className="cta-popover__title text-m text-yellow font-bold uppercase">
        {title}
      </h3>
      <p className="text-white mt-3">{content}</p>
      {children}
    </div>
  );
};

CtaPopover.propTypes = {
  content: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default CtaPopover;
