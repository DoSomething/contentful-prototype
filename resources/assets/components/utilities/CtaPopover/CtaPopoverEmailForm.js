import React, { useState } from 'react';

import Button from '../Button/Button';
import './cta-popover-email-form.scss';

const CtaPopoverEmailForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const handleChange = event => setEmailValue(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    console.log('submitted!');
  };

  return (
    <div className="cta-popover-email-form">
      <form className="email-form form pb-2 pt-4" onSubmit={handleSubmit}>
        {/* <label className="field-label">
              <span className="validation">
                <div className="validation__message {{modifier_class}}">
                  Must be a valid email address
                </div>
              </span>
            </label> */}

        <input
          className="text-field email-form__input"
          type="email"
          value={emailValue}
          placeholder="Enter your email address"
          onChange={handleChange}
        />
        <Button
          className="email-form__button"
          type="submit"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
      <p className="text-gray-200 italic text-sm">
        You&apos;ll also get a{' '}
        <a
          href="/us/about/default-notifications"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-200 underline"
        >
          few emails
        </a>{' '}
        a year for important announcements.
      </p>
    </div>
  );
};

export default CtaPopoverEmailForm;
