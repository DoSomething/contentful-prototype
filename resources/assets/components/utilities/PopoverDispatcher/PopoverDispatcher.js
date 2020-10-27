import { get } from 'lodash';
import gql from 'graphql-tag';
import { createPortal } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { useRef, useEffect } from 'react';

import {
  getTrackingSource,
  needToVerifyVoterRegStatuses,
  getCheckRegistrationStatusURL,
  isVerifiedCompletedVoterRegStatuses,
  isVerifiedIneligibleVoterRegStatuses,
  USER_VOTER_REGISTRATION_STATUS_QUERY,
} from '../../../helpers/voter-registration';
import CtaPopover from './CtaPopover/CtaPopover';
import { getCampaign } from '../../../helpers/campaign';
import SitewideBanner from './SitewideBanner/SitewideBanner';
import DelayedElement from '../DelayedElement/DelayedElement';
import { isCurrentPathInPaths, query } from '../../../helpers';
import CtaPopoverEmailForm from './CtaPopover/CtaPopoverEmailForm';
import { getUserId, isAuthenticated } from '../../../helpers/auth';
import DismissableElement from '../DismissableElement/DismissableElement';
import {
  siteWideBannerExcludedPaths,
  scholarshipsNewsletterPaths,
} from './config';

const CAMPAIGN_QUERY = gql`
  query CampaignSitewideBannerQuery($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      groupTypeId
    }
  }
`;

const PopoverDispatcher = props => {
  const usePortal = id => {
    const rootElem = useRef(document.createElement('div'));

    rootElem.current.classList.add('wrapper');

    useEffect(() => {
      const mainContainer = document.getElementById(id);

      mainContainer.prepend(rootElem.current);
    }, []);

    return rootElem.current;
  };

  const target = usePortal('popover-portal');
  const hiddenAttributeDataTestId = 'sitewide-banner-hidden';

  // Check if this path is to scholarships page or specified article pages to display the popover instead of site wide banner.
  if (isCurrentPathInPaths(scholarshipsNewsletterPaths)) {
    return createPortal(
      <DismissableElement
        name="cta_popover_scholarship_email"
        context={{ contextSource: 'newsletter_scholarships' }}
        render={(handleClose, handleComplete) => (
          <DelayedElement delay={3}>
            <CtaPopover
              title="Pays To Do Good"
              content="Want to earn easy scholarships for volunteering?
            Subscribe to DoSomething's monthly scholarship email."
              handleClose={handleClose}
            >
              <CtaPopoverEmailForm handleComplete={handleComplete} />
            </CtaPopover>
          </DelayedElement>
        )}
      />,
      target,
    );
  }

  // Check if this path is excluded, to avoid making unnecessary GraphQL requests.
  if (isCurrentPathInPaths(siteWideBannerExcludedPaths)) {
    target.setAttribute('data-testid', hiddenAttributeDataTestId);

    return null;
  }

  // If we're in "chromeless" mode, e.g. an embed, hide this bar:
  if (query('chromeless')) {
    return null;
  }

  const userId = getUserId();
  const { data: userData, loading: userLoading } = useQuery(
    USER_VOTER_REGISTRATION_STATUS_QUERY,
    {
      variables: { userId },
      skip: !userId,
    },
  );

  const campaign = getCampaign();
  const campaignId = campaign ? Number(campaign.campaignId) : null;
  const { data: campaignData, loading: campaignLoading } = useQuery(
    CAMPAIGN_QUERY,
    {
      variables: {
        campaignId,
      },
      skip: !campaignId,
    },
  );

  const userRegistrationStatus = get(userData, 'user.voterRegistrationStatus');
  const showNonVoterRegistrationContent =
    isVerifiedIneligibleVoterRegStatuses(userRegistrationStatus) ||
    isVerifiedCompletedVoterRegStatuses(userRegistrationStatus);

  if (userLoading || campaignLoading) {
    return null;
  }

  if (
    /**
     * If this is a groups campaign, we hide the banner to avoid interfering with the group finder
     * on small screen.
     */
    !!get(campaignData, 'campaign.groupTypeId') ||
    showNonVoterRegistrationContent
  ) {
    target.setAttribute('data-testid', hiddenAttributeDataTestId);

    return null;
  }

  if (
    /**
     * Checks for auth user and if the user is registered to vote/ineligible,
     * Display an refer a friend banner
     */
    isAuthenticated() &&
    showNonVoterRegistrationContent
  ) {
    return createPortal(
      <SitewideBanner
        cta="Start Now"
        link="/us/account/refer-friends"
        description="Want to build our youth-led movement? Refer a friend!"
        handleClose={props.handleClose}
        handleComplete={props.handleComplete}
      />,
      target,
    );
  }

  if (
    /**
     * Checks for auth user and if the user is self reported to be registered to vote or uncertain
     * Display a reminder to check their status
     */
    isAuthenticated() &&
    needToVerifyVoterRegStatuses(userRegistrationStatus)
  ) {
    return createPortal(
      <SitewideBanner
        cta="Get Started"
        contextSource="voter_registration_lookup_tool"
        link={getCheckRegistrationStatusURL()}
        description="1 in 8 voter registrations are invalid. Take 2 minutes to make sure you're registered at your current address."
        handleClose={props.handleClose}
        handleComplete={props.handleComplete}
      />,
      target,
    );
  }

  return createPortal(
    <SitewideBanner
      cta="Get Started"
      description="Make your voice heard. Register to vote in less than 2 minutes."
      link={`https://vote.dosomething.org/?r=${getTrackingSource('hellobar')}`}
      {...props}
    />,
    target,
  );
};

export default PopoverDispatcher;
