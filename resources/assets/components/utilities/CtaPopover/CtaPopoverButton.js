import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button/Button.js';

import { trackAnalyticsEvent } from '../../../helpers/analytics';

const button = ({ handleClick, buttonText, link }) => {
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
  return;
};

button.PropTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default button;
