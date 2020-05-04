import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Card from '../../../../components/utilities/Card/Card';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

import { buildVoterRegUrl } from '../../../../helpers/index';

const StartVoterRegistrationForm = ({ blockId, campaignId }) => {
  const [emailValue, setEmailValue] = useState('');
  const [zipcodeValue, setZipcodeValue] = useState('');
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

  const handleChange = event =>
    event.target.name === 'email'
      ? setEmailValue(event.target.value)
      : setZipcodeValue(event.target.value);

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
            <label>
              zipcode
              <input
                className="text-field"
                type="text"
                name="zipcode"
                placeholder="zipcode"
                value={zipcodeValue}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              email
              <input
                className="text-field"
                type="text"
                name="email"
                placeholder="email"
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
  referrerUserId: PropTypes.string.isRequired,
};

export default StartVoterRegistrationForm;
