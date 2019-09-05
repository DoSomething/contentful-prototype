import React from 'react';
import PropTypes from 'prop-types';

import { sixpack } from '../../../helpers';

import './cta-popover.scss';

const CtaPopover = ({ buttonText, content, handleClose, link, title }) => (
  <div className="cta-popover p-4 bordered rounded">
    <button
      type="button"
      className="modal__close -white -small"
      onClick={handleClose}
    >
      &times;
    </button>
    <h3 className="text-m text-yellow font-bold uppercase">{title}</h3>
    <p className="text-white mt-4">{content}</p>
    <a
      className="cta-popover__button button p-4 mt-4"
      href={link}
      onClick={() => sixpack().convertOnAction('ctaButtonClick')}
    >
      {buttonText}
    </a>
  </div>
);

CtaPopover.propTypes = {
  buttonText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CtaPopover;
