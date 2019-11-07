import React, { useState } from 'react';

import { trackAnalyticsEvent } from '../../../helpers/analytics';
import './cta-popover.scss';
import Button from '../Button/Button';

const CtaPopoverEmailForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const handleChange = event => setEmailValue(event.target.value);

  const handleSubmit = event => {
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
    event.preventDefault(); //advised not to use event
    document.alert(emailValue); //advised not to use this alert
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="text-field"
          type="email"
          value={emailValue}
          placeholder="Enter your email address"
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CtaPopoverEmailForm;
