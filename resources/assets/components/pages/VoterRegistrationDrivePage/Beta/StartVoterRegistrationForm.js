import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import Card from '../../../utilities/Card/Card';
import {
  buildVoterRegUrl,
  isValidEmailSyntax,
  isValidPostalCode,
} from '../../../../helpers/index';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';

const StartVoterRegistrationForm = ({ blockId, campaignId }) => {
  const [emailValue, setEmailValue] = useState('');
  const [zipcodeValue, setZipcodeValue] = useState('');
  const [emailLabel, setEmailLabel] = useState('email');
  const [zipCodeLabel, setZipCodeLabel] = useState('zipcode');
  const zipCodeLength = useRef(0);
  const url = buildVoterRegUrl(
    'web',
    'onlinedrivereferral,referral=true',
    'https://register.rockthevote.com/registrants/new?partner=37187&',
    { email_address: emailValue, home_zip_code: zipcodeValue },
  );
  /**
   * should we be passing the userID or referrerId ?
   * */

  // `https://register.rockthevote.com/registrants/new?partner=37187&source=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`;

  const isDisabled = !zipcodeValue || !emailValue;

  const redirectToRockTheVote = () => {
    window.location = url;
  };

  const handleChange = event => {
    if (event.target.name === 'email') {
      isValidEmailSyntax(event.target.value)
        ? () => {
            setEmailValue(event.target.value);
            setEmailLabel(event.target.name);
          }
        : setEmailLabel('Please include a valid email address');
    }

    if (event.target.name === 'zipcode') {
      isValidPostalCode(event.target.value)
        ? () => {
            setZipcodeValue(event.target.value);
          }
        : setZipCodeLabel('Please provide a valid zip code');
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
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

      redirectToRockTheVote();
    }
  };

  return (
    <>
      <Card className="bordered rounded" title="Register Online to vote">
        <form className="form pb-2">
          <div>
            <label htmlFor="zipcode">
              {zipCodeLabel}
              <input
                ref={zipCodeLength}
                className="text-field"
                type="text"
                name="zipcode"
                value={zipcodeValue}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="email">
              {emailLabel}
              <input
                className="text-field"
                required
                type="text"
                name="email"
                onChange={handleChange}
                value={emailValue}
              />
            </label>
          </div>
        </form>
        <PrimaryButton
          onClick={handleClick}
          isDisabled={isDisabled}
          text="Register To Vote"
        />
      </Card>
    </>
  );
};

StartVoterRegistrationForm.propTypes = {
  blockId: PropTypes.string.isRequired,
  campaignId: PropTypes.number.isRequired,
};

export default StartVoterRegistrationForm;
