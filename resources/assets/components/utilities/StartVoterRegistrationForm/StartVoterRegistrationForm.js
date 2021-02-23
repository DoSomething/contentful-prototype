import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';
import React, { useState } from 'react';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import ElementButton from '../Button/ElementButton';
import Spinner from '../../artifacts/Spinner/Spinner';
import { tailwind, colorLuminance } from '../../../helpers/display';
import { getTrackingSource } from '../../../helpers/voter-registration';

const StartVoterRegistrationForm = ({
  buttonColor,
  buttonText,
  campaignId,
  className,
  contextSource,
  groupId,
  referrerUserId,
  source,
  sourceDetails,
}) => {
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isDisabled = !zip || !email;

  const handleChange = event => {
    const { name, value } = event.target;
    return name === 'email_address' ? setEmail(value) : setZip(value);
  };

  const handleSubmit = () => {
    setSubmitted(true);

    trackAnalyticsEvent('clicked_voter_registration_action', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'voter_registration',
      context: {
        campaignId,
        contextSource,
      },
    });
  };

  return (
    <form
      data-testid="voter-registration-form"
      action="https://register.rockthevote.com/registrants/new"
      method="GET"
      onSubmit={handleSubmit}
      className={classnames('form p-3', className)}
    >
      <input type="hidden" name="partner" value="37187" />

      <input
        type="hidden"
        name="source"
        value={getTrackingSource(
          source,
          sourceDetails,
          referrerUserId,
          groupId,
        )}
        data-testid="voter-registration-tracking-source"
      />

      <div className="form-item stretched">
        <input
          className="text-field"
          required
          aria-label="Email"
          type="email"
          name="email_address"
          value={email}
          onChange={handleChange}
          data-testid="voter-registration-email-field"
          placeholder="Email"
        />
      </div>

      <div className="form-item stretched">
        <input
          className="text-field"
          aria-label="Zip Code"
          type="text"
          name="home_zip_code"
          value={zip}
          onChange={handleChange}
          required
          pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
          data-testid="voter-registration-zip-field"
          placeholder="Zip Code"
        />
      </div>

      <ElementButton
        className="w-full"
        attributes={{
          css: css`
            background-color: ${buttonColor};

            :hover {
              background-color: ${colorLuminance(buttonColor, 10)};
            }
          `,
          'data-testid': 'voter-registration-submit-button',
        }}
        isDisabled={isDisabled || submitted}
        type="submit"
        text={
          submitted ? (
            <>
              <Spinner />
              <span className="pl-1 pt-1">Processing...</span>
            </>
          ) : (
            buttonText
          )
        }
      />
    </form>
  );
};

StartVoterRegistrationForm.propTypes = {
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  campaignId: PropTypes.number,
  className: PropTypes.string,
  contextSource: PropTypes.string.isRequired,
  groupId: PropTypes.number,
  referrerUserId: PropTypes.string,
  source: PropTypes.string,
  sourceDetails: PropTypes.string.isRequired,
};

StartVoterRegistrationForm.defaultProps = {
  buttonColor: tailwind('colors.blurple')['500'],
  buttonText: 'Start Registration',
  campaignId: null,
  className: null,
  groupId: null,
  referrerUserId: null,
  source: 'web',
};

export default StartVoterRegistrationForm;
