import React from 'react';
import PropTypes from 'prop-types';

import './cta-popover-button.scss';
import ButtonLink from './ButtonLink/ButtonLink';
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
    <div>
      <ButtonLink
        className="cta-popover_button"
        link={link}
        onClick={handleClick}
      >
        {buttonText}
      </ButtonLink>
    </div>
  );
};

CtaPopoverButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CtaPopoverButton;
