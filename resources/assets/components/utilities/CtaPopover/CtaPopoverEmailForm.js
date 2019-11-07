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

    handleChange();
    event.preventDefault();

    console.log('submitted!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul className="form-actions -inline {{modifier_class}}">
          <li>
            <label className="field-label">
              <span className="validation">
                <div className="validation__message {{modifier_class}}">
                  Must be a valid email address
                </div>
              </span>
            </label>
            <input
              className="text-field"
              type="email"
              value={emailValue}
              placeholder="Enter your email address"
              onChange={handleChange}
            />
          </li>
          <li>
            <Button type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
          </li>
        </ul>
      </form>
      <p className="footnote padding-horizontal-md padding-bottom-md">
        You'll also get a{' '}
        <a
          href="/us/about/default-notifications"
          target="_blank"
          rel="noopener noreferrer"
        >
          few emails
        </a>{' '}
        a year for important announcements.
      </p>
    </div>
  );
};

export default CtaPopoverEmailForm;
