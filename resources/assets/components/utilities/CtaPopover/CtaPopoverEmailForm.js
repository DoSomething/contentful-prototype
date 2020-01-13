import { get, isString, first } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RestApiClient } from '@dosomething/gateway';

import Button from '../Button/Button';
import { env, report } from '../../../helpers/index';
import { tabularLog } from '../../../helpers/api';
import './cta-popover-email-form.scss';
import { trackAnalyticsEvent } from '../../../helpers/analytics';

const CtaPopoverEmailForm = ({ handleComplete }) => {
  const [emailValue, setEmailValue] = useState('');
  const [errorResponse, setErrorResponse] = useState(null);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const handleChange = event => setEmailValue(event.target.value);

  const handleFocus = () => {
    trackAnalyticsEvent({
      metadata: {
        label: 'call_to_action_popover',
        adjective: 'email',
        category: 'site_action',
        noun: 'call_to_action_popover',
        target: 'field',
        verb: 'focused',
      },
    });
  };

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
        setShowAffirmation(true);
        handleComplete();
        tabularLog(get(response, 'data', null));

        trackAnalyticsEvent({
          metadata: {
            label: 'call_to_action_popover_email',
            adjective: 'email',
            category: 'site_action',
            noun: 'call_to_action_popover',
            target: 'form',
            verb: 'submitted',
          },
        });

        return response;
      })
      .catch(error => {
        report(error);
        const errorMessage = isString(error.response)
          ? error.response
          : first(get(error, 'response.error.fields.email')) ||
            'Something went wrong...';
        setErrorResponse(errorMessage);

        if (window.ENV.APP_ENV !== 'production') {
          console.log('🚫 failed response? caught the error!', error);
        }

        trackAnalyticsEvent({
          context: { cta_type: newsletter_scholarships, error, errorMessage },
          metadata: {
            label: 'call_to_action_popover',
            adjective: 'call_to_action_popover',
            category: 'submission_failed',
            noun: 'form_submission',
            target: 'form',
            verb: 'failed',
          },
        });
      });
  };

  return !showAffirmation ? (
    <div className="cta-popover-email-form pt-4">
      {errorResponse ? (
        <div className="text-red-500">{errorResponse}</div>
      ) : null}
      <form className="email-form form pb-2" onSubmit={handleSubmit}>
        <input
          className="text-field email-form__input"
          type="email"
          value={emailValue}
          placeholder="Enter your email address"
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <Button className="email-form__button" type="submit">
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
  ) : (
    <div className="text-white mt-3 italic">
      Thank You For Submitting Your Email
    </div>
  );
};

CtaPopoverEmailForm.propTypes = {
  handleComplete: PropTypes.func.isRequired,
};

export default CtaPopoverEmailForm;
