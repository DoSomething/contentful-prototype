import { get } from 'lodash';
import gql from 'graphql-tag';
import { createPortal } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { useRef, useEffect } from 'react';

import {
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
import { getUserId } from '../../../helpers/auth';
import DismissableElement from '../DismissableElement/DismissableElement';
import {
  sitewideBannerExcludedPaths,
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

const PopoverDispatcher = () => {
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
  if (isCurrentPathInPaths(sitewideBannerExcludedPaths)) {
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

  return createPortal(
    <DismissableElement
      name="sitewide_banner_refer_friends"
      daysToReRender={7}
      render={(handleClose, handleComplete) => (
        <SitewideBanner
          contextSource="refer_friends"
          cta="Start Now"
          link="/us/account/refer-friends"
          description="Want to build our youth-led movement? Refer a friend!"
          handleClose={handleClose}
          handleComplete={handleComplete}
        />
      )}
    />,
    target,
  );
};

export default PopoverDispatcher;
