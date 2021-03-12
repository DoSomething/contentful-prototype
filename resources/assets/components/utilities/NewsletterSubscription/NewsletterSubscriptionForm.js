import fetch from 'node-fetch';
import React, { useState } from 'react';

import { env } from '../../../helpers/env';
import { NEWSLETTER_TOPICS } from './config';
import PrimaryButton from '../Button/PrimaryButton';
import { isAuthenticated } from '../../../helpers/auth';
import NewsletterSubscriptionCard from './NewsletterSubscriptionCard';
import NewsLetterSubscriptionFormInput from './NewsletterSubscriptionFormInput';

const NewsletterSubscriptionForm = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const [emailValue, setEmailValue] = useState('');

  const [showConfirmation, setShowConfirmation] = useState(false);

  const updateSubscriptions = topic => {
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

    // @TODO: add analytics tracking
    console.log('handling input focus...');
  };

  const handleSubmit = event => {
    event.preventDefault();

    // @TODO: temporary request to test confirmation message.
    fetch(`${env('NORTHSTAR_URL')}/status`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        setShowConfirmation(true);
      })
      .catch();
  };

  return showConfirmation ? (
    <div>
      <p>Thanks for signing up!</p>
      <p>
        Want even more? Activate your account! We&apos;ve sent you an email
        where you can set your password, valid for 72 hours.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="newsletter-gallery mt-0 gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-4">
        <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.community}>
          <NewsLetterSubscriptionFormInput
            topic={NEWSLETTER_TOPICS.community}
            updateSubscriptions={updateSubscriptions}
          />
        </NewsletterSubscriptionCard>

        <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.news}>
          <NewsLetterSubscriptionFormInput
            topic={NEWSLETTER_TOPICS.news}
            updateSubscriptions={updateSubscriptions}
          />
        </NewsletterSubscriptionCard>

        <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.lifestyle}>
          <NewsLetterSubscriptionFormInput
            topic={NEWSLETTER_TOPICS.lifestyle}
            updateSubscriptions={updateSubscriptions}
          />
        </NewsletterSubscriptionCard>

        <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.scholarships}>
          <NewsLetterSubscriptionFormInput
            topic={NEWSLETTER_TOPICS.scholarships}
            updateSubscriptions={updateSubscriptions}
          />
        </NewsletterSubscriptionCard>
      </div>

      {isAuthenticated() ? null : (
        <div className="xl:flex mt-8 xl:max-w-xl mx-auto">
          <input
            className="block border-2 border-gray-300 border-solid leading-none px-4 py-3 placeholder-gray-400 rounded text-base w-full"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            placeholder="Enter your email address"
            type="email"
            value={emailValue}
          />

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
