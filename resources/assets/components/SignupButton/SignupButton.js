import React from 'react';
import PropTypes from 'prop-types';

import { getUtms } from '../../helpers/utm';
import PrimaryButton from '../utilities/Button/PrimaryButton';
import { isCampaignClosed, query, withoutNulls } from '../../helpers';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from '../../helpers/analytics';

const SignupButton = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    campaignId,
    campaignTitle,
    className,
    contextSource,
    endDate,
    pageId,
    storeCampaignSignup,
    text,
  } = props;

  // Decorate click handler for A/B tests & analytics.
  const handleSignup = () => {
    const details = {};

    // Set affiliate opt in field if user has opted in.
    if (affiliateMessagingOptIn) {
      details.affiliateOptIn = true;
    }

    // Track signup button click event before we store the signup.
    trackAnalyticsEvent('clicked_signup', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.signup,
      label: campaignTitle,
      context: {
        campaignId,
        contextSource,
        pageId,
      },
    });

    storeCampaignSignup(campaignId, {
      body: {
        details: JSON.stringify(details),
        source_details: JSON.stringify(
          withoutNulls({
            contentful_id: pageId,
            referrer_user_id: query('referrer_user_id'),
            ...getUtms(),
          }),
        ),
      },
    });
  };

  // In descending priority: button-specific text prop,
  // campaign action text override, or standard "Take Action" copy.
  const buttonCopy = text || campaignActionText;

  return (
    <PrimaryButton
      className={className}
      onClick={handleSignup}
      text={isCampaignClosed(endDate) ? 'Notify Me' : buttonCopy}
    />
  );
};

SignupButton.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool,
  campaignActionText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  campaignTitle: PropTypes.string,
  className: PropTypes.string,
  contextSource: PropTypes.string,
  endDate: PropTypes.string,
  pageId: PropTypes.string.isRequired,
  storeCampaignSignup: PropTypes.func.isRequired,
  text: PropTypes.string,
};

SignupButton.defaultProps = {
  affiliateMessagingOptIn: false,
  campaignActionText: 'Take Action',
  campaignTitle: null,
  className: null,
  contextSource: null,
  endDate: null,
  text: null,
};

export default SignupButton;
