import React, { useState } from 'react';

import { trackAnalyticsEvent } from '../../../helpers/analytics';

import './cta-popover.scss';

const CtaPopoverEmailForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const handleChange = e => setEmailValue(e.target.value);

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
    e.preventDefault();
  };

  return (
    <div classname="cta-popover p-4 border rounded">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={emailValue}
          placeholder="Enter your email address"
          onChange={handleChange}
        />
        <button type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CtaPopoverEmailForm;
