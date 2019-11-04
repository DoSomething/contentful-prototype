import React from 'react';
import PropTypes from 'prop-types';

import { trackAnalyticsEvent } from '../../../helpers/analytics';

import './cta-popover.scss';

const CtaPopover = ({
  buttonText,
  content,
  handleClose,
  link,
  title,
  children,
}) => {
  const handleClick = () =>
    trackAnalyticsEvent({
      metadata: {
        category: 'site_action',
        target: 'button',
        verb: 'clicked',
        noun: 'call_to_action',
        adjective: 'popover',
        label: 'call_to_action_popover',
      },
      context: {
        url: link,
      },
    });

  return (
    <div className="cta-popover p-4 bordered rounded">
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
      <p className="text-white mt-4">{content}</p>
      {/* <a
        className="cta-popover__button button p-4 mt-4"
        href={link}
        onClick={handleClick}
      >
        {buttonText}
      </a> */}
      {children}
    </div>
  );
};

CtaPopover.propTypes = {
  buttonText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CtaPopover;
