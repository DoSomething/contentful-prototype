import React from 'react';
import PropTypes from 'prop-types';

import './cta-popover-button.scss';
import ButtonLink from '../ButtonLink/ButtonLink';
import { trackAnalyticsEvent } from '../../../helpers/analytics';

const CtaPopoverButton = ({ buttonText, link }) => {
  const handleClick = () =>
    trackAnalyticsEvent({
      metadata: {
        category: 'site_action',
        target: 'button',
        verb: 'clicked',
        noun: 'newsletter_cta',
        adjective: 'popover',
        label: 'newsletter_cta__popover',
      },
      context: {
        url: link,
      },
    });
  return (
    <div>
      <ButtonLink
        className="cta-popover__button"
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
