import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Card from '../../../../components/utilities/Card/Card';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import Card from '../../../utilities/Card/Card';
import {
  buildVoterRegUrl,
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
 
  const redirectToRockTheVote = () => {
    window.location = url;
  };

  const handleChange = event => {
    if (event.target.name === 'email') {
       () => {
            setEmailValue(event.target.value);
            setEmailLabel(event.target.name);
          }
    }

    if (event.target.name === 'zipcode') {
        () => {
            setZipcodeValue(event.target.value);
          }
    }
  };

  const handleClick = () => {
      trackAnalyticsEvent('click_voter_registration_action', {
        action: 'button_clicked',
        category: EVENT_CATEGORIES.campaignAction,
        label: 'voter_registration',
        context: {
          campaignId,
          url,
        },
      });

      redirectToRockTheVote();
  };

  let enabled = emailValue.length > 0 && zipcodeValue.length > 0;
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
          text="Register To Vote"
          isDisabled={enabled}
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
