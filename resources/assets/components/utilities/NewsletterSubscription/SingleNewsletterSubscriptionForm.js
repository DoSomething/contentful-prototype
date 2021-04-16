import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useState } from 'react';
import { get, isString, first } from 'lodash';
import { RestApiClient } from '@dosomething/gateway';

import { env } from '../../../helpers/env';
import PrimaryButton from '../Button/PrimaryButton';
import { tailwind } from '../../../helpers/display';
import { report } from '../../../helpers/monitoring';
import CheckIcon from '../../artifacts/CheckIcon/CheckIcon';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

const SingleNewsletterSubscriptionForm = ({ emailSubscriptionTopic }) => {
  const [emailValue, setEmailValue] = useState('');

  const [errors, setErrors] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOnChange = event => {
    event.preventDefault();

    setEmailValue(event.target.value);
  };

  const handleOnFocus = event => {
    event.preventDefault();

    // @TODO: add analytics tracking
    console.log('handling input focus...');
  };

  const handleSubmit = event => {
    event.preventDefault();

    trackAnalyticsEvent('clicked_signup_newsletter', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.signup,
      label: 'newsletter',
      context: {
        url: window.location.href,
      },
    });

    const client = new RestApiClient(`${env('NORTHSTAR_URL')}`);

    client
      .post('/v2/subscriptions', {
        email: emailValue,
        email_subscription_topic: emailSubscriptionTopic,
        source: 'phoenix-next',
        source_detail: 'lifestyle_newsletter-cta_articles_page',
      })
      .then(() => {
        setShowConfirmation(true);

        trackAnalyticsEvent('submitted_call_to_action_popover', {
          action: 'form_submitted',
          category: EVENT_CATEGORIES.siteAction,
          label: 'call_to_action_popover',
          context: { contextSource: `newsletter_${emailSubscriptionTopic}` },
        });
      })
      .catch(error => {
        report(error);
        const errorMessage = isString(error.response)
          ? error.response
          : first(get(error, 'response.error.fields.email')) ||
            'Something went wrong...';
        setErrors(errorMessage);

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

  return showConfirmation ? (
    <div className="mb-10 mt-8">
      <p>
        <CheckIcon
          className="align-baseline inline-block"
          color={tailwind('colors.green.500')}
          height="18px"
        />{' '}
        Thanks for signing up!
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div
        className={classnames('md:flex md:max-w-xl mt-8 mx-auto', {
          'pb-10': get(errors, 'fields.email', null),
        })}
      >
        <div className="relative w-full">
          <input
            className={classnames(
              'block border-2 border-gray-300 border-solid h-full leading-none outline-none focus:border-blurple-100 px-4 py-3 placeholder-gray-400 rounded text-base w-full',
              {
                'border-red-500': get(errors, 'fields.email', null),
              },
            )}
            data-testid="articles-page-email-input"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            placeholder="Enter your email address"
            type="email"
            value={emailValue}
          />
          {errors ? (
            <p className="md:absolute text-left text-red-500 px-4 py-2">
              {errors}
            </p>
          ) : null}
        </div>

        <PrimaryButton
          attributes={{
            'data-testid': 'articles-page-newsletter-signup-button',
          }}
          className="mt-4 md:mt-0 md:ml-2 md:w-48 text-lg w-full"
          text="Sign Up"
          type="submit"
        />
      </div>
    </form>
  );
};

SingleNewsletterSubscriptionForm.propTypes = {
  emailSubscriptionTopic: PropTypes.string.isRequired,
};

export default SingleNewsletterSubscriptionForm;
