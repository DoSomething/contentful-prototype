import React, { useState } from 'react';

import { trackAnalyticsEvent } from '../../../helpers/analytics';
import button from '/CtaPopoverButton';
import './cta-popover.scss';
import Button from './Button/Button.js';

const CtaPopoverEmailForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const handleChange = event => setEmailValue(event.target.value);

  const handleSubmit = () => {
    trackAnalyticsEvent({
      metadata: {
        category: 'site_action',
        target: 'input',
        verb: 'submitted',
        noun: 'call_to_action',
        adjective: 'popover',
        label: 'call_to_action_popover',
      },
    });
    alert(emailValue);
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={emailValue}
          placeholder="Enter your email address"
          onChange={handleChange}
        />
        <button />
      </form>
    </div>
  );
};

export default CtaPopoverEmailForm;
