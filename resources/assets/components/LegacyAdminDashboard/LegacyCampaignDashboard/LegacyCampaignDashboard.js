/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';

import ElementButton from '../../utilities/Button/ElementButton';

const LegacyCampaignDashboard = props => {
  const {
    campaignId,
    clickedShowAffirmation,
    clickedRemoveSignUp,
    signupCreated,
    isSignedUp,
  } = props;

  const onSignUpClick = () =>
    !isSignedUp ? signupCreated(campaignId) : clickedRemoveSignUp(campaignId);

  return (
    <div>
      <ElementButton
        className="bg-gray-600 hover:bg-gray-500"
        onClick={clickedShowAffirmation}
        text="Show Affirmation"
      />

      <ElementButton
        className="bg-gray-600 hover:bg-gray-500 ml-3"
        onClick={onSignUpClick}
        text={`Mock ${isSignedUp ? 'Un-sign Up' : 'Sign Up'}`}
      />
    </div>
  );
};

LegacyCampaignDashboard.propTypes = {
  campaignId: PropTypes.string.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  clickedShowAffirmation: PropTypes.func.isRequired,
  clickedRemoveSignUp: PropTypes.func.isRequired,
  signupCreated: PropTypes.func.isRequired,
};

export default LegacyCampaignDashboard;
