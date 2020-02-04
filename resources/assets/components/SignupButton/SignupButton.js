import React from 'react';
import PropTypes from 'prop-types';

import Button from '../utilities/Button/Button';
import { trackAnalyticsEvent } from '../../helpers/analytics';
import { isCampaignClosed, query, withoutNulls } from '../../helpers';

const SignupButton = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    campaignId,
    campaignTitle,
    className,
    contextSource,
    disableSignup,
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
      category: 'signup',
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
            utm_source: query('utm_source'),
            utm_medium: query('utm_medium'),
            utm_campaign: query('utm_campaign'),
          }),
        ),
      },
    });
  };

  // Have signups been disabled for this campaign?
  if (disableSignup) {
    return null;
  }

  // In descending priority: button-specific text prop,
  // campaign action text override, or standard "Take Action" copy.
  const buttonCopy = text || campaignActionText;

  return (
    <Button className={className} onClick={handleSignup}>
      {isCampaignClosed(endDate) ? 'Notify Me' : buttonCopy}
    </Button>
  );
};

SignupButton.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool,
  campaignActionText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  campaignTitle: PropTypes.string,
  className: PropTypes.string,
  contextSource: PropTypes.string,
  disableSignup: PropTypes.bool,
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
  disableSignup: false,
  endDate: null,
  text: null,
};

export default SignupButton;
