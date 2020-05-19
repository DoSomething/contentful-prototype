import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import Card from '../../../utilities/Card/Card';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';

const StartVoterRegistrationForm = ({ campaignId, referrerUserId }) => {
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');

  const urlSourceDetails = `user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`;
  const isDisabled = !zip || !email;

  const handleChange = event => {
    const { name, value } = event.target;
    return name === 'email_address' ? setEmail(value) : setZip(value);
  };

  const handleSubmit = () => {
    trackAnalyticsEvent('clicked_voter_registration_action', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'voter_registration',
      context: {
        campaignId,
        contextSource: 'beta-voter-registration-drive-page',
      },
    });
  };

  return (
    <>
      <Card
        attributes={{ 'data-testid': 'voter-registration-form-card' }}
        className="md:w-3/5 bordered rounded"
        title="Register online to vote"
      >
        <form
          action="https://register.rockthevote.com/registrants/new"
          method="GET"
          onSubmit={handleSubmit}
          className="form p-3"
        >
          <input type="hidden" name="partner" value="37187" />

          <input
            type="hidden"
            name="source"
            value={urlSourceDetails}
            data-testid="voter-registration-source-details"
          />

          <div className="form-item stretched">
            <label htmlFor="email" className="font-bold">
              Email
              <input
                className="text-field"
                required
                type="email"
                name="email_address"
                value={email}
                onChange={handleChange}
                data-testid="voter-registration-email-field"
              />
            </label>
          </div>

          <div className="form-item stretched">
            <label htmlFor="zip" className="font-bold">
              Zip Code
              <input
                className="text-field"
                type="text"
                name="home_zip_code"
                value={zip}
                onChange={handleChange}
                required
                pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
                data-testid="voter-registration-zip-field"
              />
            </label>
          </div>

          <PrimaryButton
            attributes={{ 'data-testid': 'voter-registration-submit-button' }}
            className="w-full"
            isDisabled={isDisabled}
            text="Start Your Registration"
            type="submit"
          />
        </form>
      </Card>
    </>
  );
};

StartVoterRegistrationForm.propTypes = {
  campaignId: PropTypes.number.isRequired,
  referrerUserId: PropTypes.string.isRequired,
};

export default StartVoterRegistrationForm;
