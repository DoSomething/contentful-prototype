/* global window */

import { get } from 'lodash';
import classnames from 'classnames';
import React, { useState } from 'react';
import { RestApiClient } from '@dosomething/gateway';

import { env } from '../../../helpers/env';
import { NEWSLETTER_TOPICS } from './config';
import PrimaryButton from '../Button/PrimaryButton';
import { tailwind } from '../../../helpers/display';
import { isAuthenticated } from '../../../helpers/auth';
import CheckIcon from '../../artifacts/CheckIcon/CheckIcon';
import NewsletterSubscriptionCard from './NewsletterSubscriptionCard';
import NewsLetterSubscriptionFormInput from './NewsletterSubscriptionFormInput';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

const NewsletterSubscriptionForm = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const [emailValue, setEmailValue] = useState('');

  const [errors, setErrors] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const updateSubscriptions = topic => {
    trackAnalyticsEvent('clicked_option_newsletter', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: topic,
      context: {
        value: topic,
        url: window.location.href,
      },
    });

    if (subscriptions.includes(topic)) {
      const updatedSubscriptionTopics = subscriptions.filter(
        subscriptionTopic => {
          return subscriptionTopic !== topic;
        },
      );

      setSubscriptions(updatedSubscriptionTopics);
    } else {
      setSubscriptions([...subscriptions, topic]);
    }
  };

  const handleOnChange = event => {
    event.preventDefault();

    setEmailValue(event.target.value);
  };

  const handleOnFocus = event => {
    event.preventDefault();

    trackAnalyticsEvent('focused_newsletter_signup_email', {
      action: 'field_focused',
      category: EVENT_CATEGORIES.siteAction,
      label: 'newsletter',
      context: { contextSource: 'newsletter_subscription_signup' },
    });
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
        email_subscription_topic: subscriptions,
        source: 'phoenix-next',
        source_detail: 'newsletter_subscriptions-about-page',
      })
      .then(() => {
        setShowConfirmation(true);
      })
      .catch(error => {
        setErrors(error.response.error);
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

      <p className="mt-6">Want even more? Activate your account!</p>

      <p className="mt-3">
        We&apos;ve sent you an email where you can set your password, valid for
        72 hours.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="newsletter-gallery mt-0 gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-4">
        {Object.keys(NEWSLETTER_TOPICS).map(key => {
          return (
            <NewsletterSubscriptionCard
              key={`newsletter-${key}`}
              topic={NEWSLETTER_TOPICS[key]}
            >
              <NewsLetterSubscriptionFormInput
                topic={NEWSLETTER_TOPICS[key]}
                updateSubscriptions={updateSubscriptions}
              />
            </NewsletterSubscriptionCard>
          );
        })}
      </div>

      {get(errors, 'fields.email_subscription_topic', null) ? (
        <p className="p-4 text-red-500">
          Please select at least one newsletter to sign up for!
        </p>
      ) : null}

      {isAuthenticated() ? null : (
        <div
          className={classnames('md:flex md:max-w-xl mt-8 mx-auto', {
            'pb-10': get(errors, 'fields.email', null),
          })}
        >
          <div className="relative w-full">
            {/* @TODO: Componentize form inputs and incorporate showing validation errors. */}
            <input
              className={classnames(
                'block border-2 border-gray-300 border-solid h-full leading-none outline-none focus:border-blurple-100 px-4 py-3 placeholder-gray-400 rounded text-base w-full',
                {
                  'border-red-500': get(errors, 'fields.email', null),
                },
              )}
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              placeholder="Enter your email address"
              type="email"
              value={emailValue}
            />
            {get(errors, 'fields.email', null) ? (
              <p className="md:absolute text-left text-red-500 px-4 py-2">
                {get(errors, 'fields.email', null)}
              </p>
            ) : null}
          </div>

          <PrimaryButton
            className="mt-4 md:mt-0 md:ml-2 md:w-48 text-lg w-full"
            text="Sign Up"
            type="submit"
          />
        </div>
      )}
    </form>
  );
};

export default NewsletterSubscriptionForm;
