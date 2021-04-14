import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useState } from 'react';
import { RestApiClient } from '@dosomething/gateway';

import { env } from '../../../helpers/env';
import PrimaryButton from '../Button/PrimaryButton';
import { tailwind } from '../../../helpers/display';
import CheckIcon from '../../artifacts/CheckIcon/CheckIcon';

const SingleNewsletterSubscriptionForm = emailSubscriptionTopic => {
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

    const client = new RestApiClient(`${env('NORTHSTAR_URL')}`);

    client
      .post('/v2/subscriptions', {
        email: emailValue,
        email_subscription_topic: emailSubscriptionTopic,
        source: 'phoenix-next',
        source_detail: 'lifestyle_newsletter_subscriptions-articles-page',
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
          {get(errors, 'fields.email', null) ? (
            <p className="md:absolute text-left text-red-500 px-4 py-2">
              {get(errors, 'fields.email', null)}
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
