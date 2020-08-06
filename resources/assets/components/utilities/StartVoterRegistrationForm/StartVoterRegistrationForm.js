import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useState } from 'react';

import Card from '../Card/Card';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import PrimaryButton from '../Button/PrimaryButton';
import Spinner from '../../artifacts/Spinner/Spinner';
import { getTrackingSource } from '../../../helpers/voter-registration';

const StartVoterRegistrationForm = ({
  betaPage,
  campaignId,
  className,
  contextSource,
  groupId,
  referrerUserId,
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
    <>
      <Card
        attributes={{ 'data-testid': 'voter-registration-form-card' }}
        className={classnames(className, 'bg-gray-100 border-none')}
        title={!betaPage ? 'Register Online to Vote' : ''}
      >
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
            value={getTrackingSource(sourceDetails, referrerUserId, groupId)}
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

          <PrimaryButton
            attributes={{ 'data-testid': 'voter-registration-submit-button' }}
            className="w-full"
            isDisabled={isDisabled}
            text={
              submitted ? (
                <div className="flex justify-center">
                  <Spinner />
                  <span className="pl-1 pt-1">Processing...</span>
                </div>
              ) : (
                'Start Your Registration'
              )
            }
            type="submit"
          />
        </form>
      </Card>
    </>
  );
};

StartVoterRegistrationForm.propTypes = {
  betaPage: PropTypes.bool,
  campaignId: PropTypes.number,
  className: PropTypes.string,
  contextSource: PropTypes.string.isRequired,
  groupId: PropTypes.number,
  referrerUserId: PropTypes.string,
  sourceDetails: PropTypes.string.isRequired,
};

StartVoterRegistrationForm.defaultProps = {
  betaPage: false,
  campaignId: null,
  className: null,
  groupId: null,
  referrerUserId: null,
};

export default StartVoterRegistrationForm;
