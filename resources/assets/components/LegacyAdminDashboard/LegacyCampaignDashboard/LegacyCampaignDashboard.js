/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';

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
      <button
        type="button"
        className="btn bg-gray-600 hover:bg-gray-500"
        onClick={clickedShowAffirmation}
      >
        Show Affirmation
      </button>
      <button
        type="button"
        className="btn bg-gray-600 hover:bg-gray-500 ml-3"
        onClick={onSignUpClick}
      >
        {`Mock ${isSignedUp ? 'Un-sign Up' : 'Sign Up'}`}
      </button>
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
