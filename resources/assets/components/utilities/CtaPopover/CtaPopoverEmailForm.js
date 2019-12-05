import get from 'lodash/get';
import React, { useState } from 'react';
import { RestApiClient } from '@dosomething/gateway';

import Button from '../Button/Button';
import { env, report } from '../../../helpers/index';
import { tabularLog } from '../../../helpers/api';

import './cta-popover-email-form.scss';

const CtaPopoverEmailForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const [errorResponse, setErrorResponse] = useState(null);
  const handleChange = event => setEmailValue(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    const client = new RestApiClient(`${env('NORTHSTAR_URL')}`);

    client
      .post('/v2/subscriptions', {
        email: emailValue,
        email_subscription_topic: 'scholarships',
        source: 'phoenix-next',
        source_detail: 'scholarship_newsletter-cta_scholarship-page',
      })
      .then(response => {
        tabularLog(get(response, 'data', null));

        return response;
      })
      .catch(error => {
        setErrorResponse(error.response.error);

        if (window.ENV.APP_ENV !== 'production') {
          console.log('🚫 failed response? caught the error!', error);
        }
      });
  };

  return (
    <div className="cta-popover-email-form pt-4">
      {errorResponse && errorResponse.fields.email ? (
        <div className="text-red-500">{errorResponse.fields.email[0]}</div>
      ) : null}
      <form className="email-form form pb-2" onSubmit={handleSubmit}>
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
