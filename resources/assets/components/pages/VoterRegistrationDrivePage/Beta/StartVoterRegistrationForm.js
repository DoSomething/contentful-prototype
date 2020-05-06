import PropTypes from 'prop-types';
import React, { useReducer } from 'react';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import Card from '../../../utilities/Card/Card';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';

const StartVoterRegistrationForm = ({ campaignId, referrerUserId }) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      zip: '',
    },
  );

  const isDisabled = !userInput.zip || !userInput.email;
  const handleChange = event => {
    const { name, value } = event.target;
    setUserInput({ [name]: value });
  };

  const handleClick = () => {
    if (!isDisabled) {
      trackAnalyticsEvent('click_voter_registration_action', {
        action: 'button_clicked',
        category: EVENT_CATEGORIES.campaignAction,
        label: 'voter_registration',
        context: {
          campaignId,
        },
      });
      window.location = `https://register.rockthevote.com/registrants/new?partner=37187&source=user:${referrerUserId},source:web,source_details:onlinedrivereferral,referral=true&email_address=${userInput.email}&home_zip_code=${userInput.zip}`;
    }
  };

  return (
    <>
      <Card
        className="md:w-3/5 bordered rounded"
        title="Register online to vote"
      >
        <form className="form p-3">
          <div className="form-item stretched">
            <label htmlFor="email" className="font-bold">
              email
              <input
                className="text-field"
                required
                type="text"
                name="email"
                value={userInput.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-item stretched">
            <label htmlFor="zip" className="font-bold">
              zip code
              <input
                className="text-field"
                type="text"
                name="zip"
                value={userInput.zip}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <PrimaryButton
            className="w-full"
            onClick={handleClick}
            isDisabled={isDisabled}
            text="Register To Vote"
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
