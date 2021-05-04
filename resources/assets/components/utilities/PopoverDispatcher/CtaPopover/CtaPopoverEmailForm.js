import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { get, isString, first } from 'lodash';
import { RestApiClient } from '@dosomething/gateway';

import { env } from '../../../../helpers/env';
import { tabularLog } from '../../../../helpers/api';
import PrimaryButton from '../../Button/PrimaryButton';
import { report } from '../../../../helpers/monitoring';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

const CtaPopoverEmailForm = ({
  emailSubscriptionTopic,
  handleComplete,
  submissionSourceDetails,
}) => {
  const [emailValue, setEmailValue] = useState('');
  const [errorResponse, setErrorResponse] = useState(null);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const handleChange = event => setEmailValue(event.target.value);

  const handleFocus = () => {
    trackAnalyticsEvent('focused_call_to_action_popover_email', {
      action: 'field_focused',
      category: EVENT_CATEGORIES.siteAction,
      label: 'call_to_action_popover',
      context: { contextSource: `newsletter_${emailSubscriptionTopic}` },
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    trackAnalyticsEvent('submitted_call_to_action_popover', {
      action: 'form_submitted',
      category: EVENT_CATEGORIES.siteAction,
      label: 'call_to_action_popover',
      context: { contextSource: `newsletter_${emailSubscriptionTopic}` },
    });

    const client = new RestApiClient(`${env('NORTHSTAR_URL')}`);

    client
      .post('/v2/subscriptions', {
        email: emailValue,
        email_subscription_topic: emailSubscriptionTopic,
        source: 'phoenix-next',
        source_detail: submissionSourceDetails,
      })
      .then(response => {
        setShowAffirmation(true);
        handleComplete();
        tabularLog(get(response, 'data', null));

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

        trackAnalyticsEvent('failed_call_to_action_popover', {
          action: 'form_failed',
          category: EVENT_CATEGORIES.siteAction,
          label: 'call_to_action_popover',
          context: {
            contextSource: `newsletter_${emailSubscriptionTopic}`,
            error,
            errorMessage,
          },
        });
      });
  };

  return !showAffirmation ? (
    <div
      className="pt-4"
      data-test="cta-popover-email-form"
      data-testid="cta-popover-email-form"
    >
      {errorResponse ? (
        <div className="text-red-500">{errorResponse}</div>
      ) : null}

      <form className="form flex pb-2" onSubmit={handleSubmit}>
        <input
          className="border-0 p-3 rounded-bl rounded-br-none rounded-tl rounded-tr-none w-full"
          type="text"
          value={emailValue}
          placeholder="Enter your email address"
          onChange={handleChange}
          onFocus={handleFocus}
        />

        <PrimaryButton
          className="rounded-bl-none rounded-tl-none w-32"
          text="Sign Up"
          type="submit"
        />
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
    <div
      className="text-white mt-3 italic"
      data-testid="cta-popover-email-form-affirmation"
    >
      Thank You For Submitting Your Email
    </div>
  );
};

CtaPopoverEmailForm.propTypes = {
  emailSubscriptionTopic: PropTypes.oneOf([
    'lifestyle',
    'scholarships',
    'news',
    'community',
  ]).isRequired,
  handleComplete: PropTypes.func.isRequired,
  submissionSourceDetails: PropTypes.string.isRequired,
};

export default CtaPopoverEmailForm;
