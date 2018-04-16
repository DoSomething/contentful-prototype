/* global window, confirm, alert */
/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CampaignDashboard = props => {
  const {
    hasLandingPage,
    slug,
    clickedShowAffirmation,
    clickedShowLandingPage,
    clickedShowActionPage,
    clickedRemoveSignUp,
    hasReferralRB,
    signupCreated,
    isAdmin,
    isSignedUp,
  } = props;

  const onSignUpClick = () =>
    !isSignedUp ? signupCreated() : clickedRemoveSignUp();

  const onReferralExportClick = () => {
    const message =
      'Please confirm your intent to export this data. This will permanently mark the records as already exported and cannot be undone.';
    if (confirm(message)) {
      const downloadSizeMessage =
        'Please note: the max export size is 150 records at a time, so if your exported file contains that amount of rows, you may need to repeat the download to receive the rest of the records';
      alert(downloadSizeMessage);
      window.location.href = '/next/referrals/export';
    }
  };

  return (
    <div>
      <a
        className="button -secondary margin-md"
        href={`/next/cache/campaign_${slug}?redirect=${
          window.location.pathname
        }`}
      >
        Clear Cache
      </a>
      <button
        className="button -secondary margin-md"
        onClick={clickedShowAffirmation}
      >
        Show Affirmation
      </button>
      {hasLandingPage ? (
        <button
          className="button -secondary margin-md"
          onClick={clickedShowLandingPage}
        >
          Show Landing Page
        </button>
      ) : null}
      <Link
        className="button -secondary margin-md"
        to={`/us/campaigns/${slug}/action`}
        onClick={clickedShowActionPage}
      >
        Show Action Page
      </Link>
      <button className="button -secondary margin-md" onClick={onSignUpClick}>
        {`Mock ${isSignedUp ? 'Un-sign Up' : 'Sign Up'}`}
      </button>
      {hasReferralRB && isAdmin ? (
        <button
          className="button -secondary margin-md"
          onClick={onReferralExportClick}
        >
          Download Referrals CSV Export
        </button>
      ) : null}
    </div>
  );
};

CampaignDashboard.propTypes = {
  hasLandingPage: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  clickedShowAffirmation: PropTypes.func.isRequired,
  clickedShowLandingPage: PropTypes.func.isRequired,
  clickedShowActionPage: PropTypes.func.isRequired,
  clickedRemoveSignUp: PropTypes.func.isRequired,
  signupCreated: PropTypes.func.isRequired,
  hasReferralRB: PropTypes.bool.isRequired,
};

CampaignDashboard.defaultProps = {
  hasLandingPage: false,
};

export default CampaignDashboard;
