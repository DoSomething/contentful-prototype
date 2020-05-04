import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import Card from '../../../utilities/Card/Card';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';

const StartVoterRegistrationForm = ({
  blockId,
  campaignId,
  referrerUserId,
}) => {
  const [emailValue, setEmailValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');
  const url = `https://register.rockthevote.com/registrants/new?partner=37187&source=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`;

  const handleChange = event =>
    event.target.name === 'email'
      ? setEmailValue(event.target.name)
      : setZipCodeValue(event.target.value);
  const handleClick = () => {
    trackAnalyticsEvent('click_voter_registration_action', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'voter_registration',
      context: {
        blockId,
        campaignId,
        url,
      },
    });
  };

  return (
    <Card title="Register Online to vote" className="bordered rounded">
      <form className="form pb-2">
        <label htmlFor="zipCode">
          zip code
          <input
            className="text-field"
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="55555"
            value={zipCodeValue}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          email
          <input
            className="text-field"
            type="text"
            id="email"
            name="email"
            placeholder="55555"
            value={emailValue}
            onChange={handleChange}
          />
        </label>
      </form>
      <PrimaryButton onClick={handleClick} href={url} text="Register To Vote" />
    </Card>
  );
};

StartVoterRegistrationForm.propTypes = {
  blockId: PropTypes.string.isRequired,
  campaignId: PropTypes.number.isRequired,
  referrerUserId: PropTypes.string.isRequired,
};

export default StartVoterRegistrationForm;
