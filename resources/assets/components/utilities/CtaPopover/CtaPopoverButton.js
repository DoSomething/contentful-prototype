import React from 'react';
import PropTypes from 'prop-types';

import { trackAnalyticsEvent } from '../../../helpers/analytics';

const CtaPopoverButton = ({ buttonText, link }) => {
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
        onClick={handleClick}
      >
        &times;
        {buttonText}
      </button>
    </div>
  );
};

CtaPopoverButton.PropTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CtaPopoverButton;
