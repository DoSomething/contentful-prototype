import React, { useState } from 'react';

import Button from '../Button/Button';
import './cta-popover-email-form.scss';

const CtaPopoverEmailForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const handleChange = event => setEmailValue(event.target.value);

  const handleSubmit = event => {
    handleChange();
    event.preventDefault();

    console.log('submitted!');
  };

  return (
    <div>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          {/* <label className="field-label">
              <span className="validation">
                <div className="validation__message {{modifier_class}}">
                  Must be a valid email address
                </div>
              </span>
            </label> */}
          <li className="embed-submit-field">
            <input
              className="text-field"
              type="email"
              value={emailValue}
              placeholder="Enter your email address"
              onChange={handleChange}
            />
            <Button type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
          </li>
        </form>
      </div>
      <p className="text-gray-200 flex-center-xy font-italic text-xs">
        You&apos;ll also get a{' '}
        <a
          href="/us/about/default-notifications"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-200"
        >
          few emails
        </a>{' '}
        a year for important announcements.
      </p>
    </div>
  );
};

export default CtaPopoverEmailForm;
