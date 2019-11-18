import React from 'react';
import PropTypes from 'prop-types';

import './cta-popover.scss';

const CtaPopover = ({ content, handleClose, title }) => {
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
<<<<<<< HEAD
      <p className="text-white mt-4">{content}</p>
=======
      <p className="text-white mt-3">{content}</p>
>>>>>>> 7205ddeb011f12c4959db892a6ca75b668e57f24
    </div>
  );
};

CtaPopover.propTypes = {
  content: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default CtaPopover;
