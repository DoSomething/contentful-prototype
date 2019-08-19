/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';

const CampaignDashboard = props => {
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
        className="button -secondary margin-md"
        onClick={clickedShowAffirmation}
      >
        Show Affirmation
      </button>
      <button
        type="button"
        className="button -secondary margin-md"
        onClick={onSignUpClick}
      >
        {`Mock ${isSignedUp ? 'Un-sign Up' : 'Sign Up'}`}
      </button>
    </div>
  );
};

CampaignDashboard.propTypes = {
  campaignId: PropTypes.string.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  clickedShowAffirmation: PropTypes.func.isRequired,
  clickedRemoveSignUp: PropTypes.func.isRequired,
  signupCreated: PropTypes.func.isRequired,
};

export default CampaignDashboard;
