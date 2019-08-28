import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Button from '../utilities/Button/Button';
import { query, withoutNulls } from '../../helpers';
import SixpackExperiment from '../utilities/SixpackExperiment/SixpackExperiment';

const SignupButton = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    campaignId,
    campaignTitle,
    className,
    disableSignup,
    displayClosedCampaignCopy,
    pageId,
    sixpackSourceActionText,
    sourceActionText,
    storeCampaignSignup,
    text,
    trafficSource,
  } = props;

  // Decorate click handler for A/B tests & analytics.
  const handleSignup = () => {
    const details = {};

    // Set affiliate opt in field if user has opted in.
    if (affiliateMessagingOptIn) {
      details.affiliateOptIn = true;
    }

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
      analytics: {
        context: {
          pageId,
        },
        label: campaignTitle,
        target: 'button',
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

  // Button copy override based on the user's traffic source.
  const sourceOverride = get(sourceActionText, trafficSource);
  return sixpackSourceActionText && sourceOverride ? (
    /* @SIXPACK Code Test: 2019-07-19 */
    <SixpackExperiment
      title={`Source Action Text Override ${campaignTitle}`}
      convertableActions={['signup']}
      control={
        <Button
          className={className}
          onClick={handleSignup}
          testName="Default Copy"
        >
          {displayClosedCampaignCopy ? 'Notify Me' : buttonCopy}
        </Button>
      }
      alternatives={[
        <Button
          className={className}
          onClick={handleSignup}
          testName="Source Action Text Override"
        >
          {displayClosedCampaignCopy ? 'Notify Me' : sourceOverride}
        </Button>,
      ]}
    />
  ) : (
    /* @SIXPACK Code Test: 2019-07-19 */
    <Button className={className} onClick={handleSignup}>
      {displayClosedCampaignCopy ? 'Notify Me' : buttonCopy}
    </Button>
  );
};

SignupButton.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool.isRequired,
  campaignActionText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  campaignTitle: PropTypes.string,
  className: PropTypes.string,
  disableSignup: PropTypes.bool,
  displayClosedCampaignCopy: PropTypes.bool,
  pageId: PropTypes.string.isRequired,
  sixpackSourceActionText: PropTypes.bool,
  sourceActionText: PropTypes.objectOf(PropTypes.string),
  storeCampaignSignup: PropTypes.func.isRequired,
  text: PropTypes.string,
  trafficSource: PropTypes.string,
};

SignupButton.defaultProps = {
  campaignActionText: 'Take Action',
  campaignTitle: null,
  className: null,
  disableSignup: false,
  displayClosedCampaignCopy: false,
  sixpackSourceActionText: false,
  sourceActionText: null,
  text: null,
  trafficSource: null,
};

export default SignupButton;
