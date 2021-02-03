import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Card from '../utilities/Card/Card';
import { withoutNulls } from '../../helpers/data';
import { getUtms, query } from '../../helpers/url';
import Spinner from '../artifacts/Spinner/Spinner';
import GroupFinder from './GroupFinder/GroupFinder';
import ErrorBlock from '../blocks/ErrorBlock/ErrorBlock';
import { siteConfig, featureFlag } from '../../helpers/env';
import PrimaryButton from '../utilities/Button/PrimaryButton';
import TextContent from '../utilities/TextContent/TextContent';
import { getUserId, isAuthenticated, useGate } from '../../helpers/auth';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from '../../helpers/analytics';
import {
  getCampaign,
  isCampaignClosed,
  SEARCH_USER_CAMPAIGN_QUERY,
} from '../../helpers/campaign';

export const CAMPAIGN_SIGNUP_MUTATION = gql`
  mutation CampaignSignupFormMutation(
    $campaignId: Int!
    $groupId: Int
    $referrerUserId: String
    $sourceDetails: JSON
    $details: JSON
  ) {
    createSignup(
      campaignId: $campaignId
      groupId: $groupId
      referrerUserId: $referrerUserId
      sourceDetails: $sourceDetails
      details: $details
    ) {
      id
      campaignId
      groupId
      referrerUserId
      sourceDetails
      details
    }
  }
`;

const CampaignSignupForm = props => {
  const {
    displayAffiliateOptIn,
    className,
    contextSource,
    groupType,
    signupCreated,
    storeCampaignSignup,
    text,
  } = props;
  const userId = getUserId();
  const campaign = getCampaign();

  const {
    affiliateOptInContent,
    actionText,
    campaignId,
    title: campaignTitle,
    endDate,
  } = campaign;

  const { pageId } = campaign || get(window.STATE, 'page', {});

  const campaignActionText = actionText || 'Take Action';

  // First, we'll want to check if the (authenticated) user is already signed up for this campaign:
  // (If so, we don't want to display this signup form, and will skip any post-auth signup mutations).
  const { data: campaignSignupData, loading } = useQuery(
    SEARCH_USER_CAMPAIGN_QUERY,
    {
      variables: {
        userId,
        campaignId,
      },
      skip: !isAuthenticated() || !featureFlag('graphql_campaign_signup'),
    },
  );

  const [affiliateMessagingOptIn, setAffiliateMessagingOptIn] = useState(false);

  // We'll set up some state to store the selected Group ID if applicable on this form.
  const [groupId, setGroupId] = useState(null);

  // We'll want to redirect anonymous users to the auth flow, while stashing their selected data to session storage.
  const [flash, authenticate] = useGate(
    // Only pull the stashed data once we're done loading the users signups so that
    // we don't overwrite it when the component refreshes!
    loading ? '' : `CampaignSignupForm:${campaignId}`,
  );

  // Set up a GraphQL mutation to handle signing up the user once they submit the form.
  const [
    handleSignupMutation,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(CAMPAIGN_SIGNUP_MUTATION, {
    variables: {
      campaignId: Number(campaignId),
      referrerUserId: query('referrer_user_id'),
      sourceDetails: JSON.stringify(
        withoutNulls({
          contentful_id: pageId,
          ...getUtms(),
        }),
      ),
    },
    onCompleted: mutationDataResponse => {
      trackAnalyticsEvent('completed_signup', {
        action: 'signup_completed',
        category: EVENT_CATEGORIES.campaignAction,
        label: campaignTitle,
        context: {
          activityId: mutationDataResponse.createSignup.id,
          contextSource,
          campaignId,
          pageId,
          groupId,
        },
      });

      // Trigger the Redux action to kick off the signup affirmation modal.
      // @TODO: Handle this internally without Redux.
      signupCreated(campaignId);
    },
    onError: error => {
      trackAnalyticsEvent('failed_signup', {
        action: 'signup_failed',
        category: EVENT_CATEGORIES.campaignAction,
        label: campaignTitle,
        context: {
          contextSource,
          campaignId,
          error,
          pageId,
          groupId,
        },
      });
    },
  });

  useEffect(() => {
    // If we're returning from the authentication flow with "flashed" data
    // (and the user isn't already signed up for this campaign!), complete the signup:
    if (
      !loading &&
      flash.signupData &&
      !get(campaignSignupData, 'signups', []).length
    ) {
      handleSignupMutation({ variables: flash.signupData });
    }
  }, [flash]);

  if (loading) {
    return <Spinner className="flex justify-center p-3 pb-8" />;
  }

  if (mutationError) {
    return <ErrorBlock error={mutationError} />;
  }

  const handleSignup = () => {
    // Track signup button click event before we store the signup.
    trackAnalyticsEvent('clicked_signup', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.signup,
      label: campaignTitle,
      context: {
        campaignId,
        contextSource,
        groupId,
        pageId,
      },
    });

    const details = JSON.stringify(
      withoutNulls({
        affiliateOptIn: affiliateMessagingOptIn,
      }),
    );

    if (featureFlag('graphql_campaign_signup')) {
      const signupData = { groupId, details };

      return isAuthenticated()
        ? handleSignupMutation({ variables: signupData })
        : authenticate({ signupData });
    }

    return storeCampaignSignup(campaignId, {
      body: {
        details,
        group_id: groupId,
        referrer_user_id: query('referrer_user_id'),
        source_details: JSON.stringify(
          withoutNulls({
            contentful_id: pageId,
            ...getUtms(),
          }),
        ),
      },
    });
  };

  const handleGroupFinderChange = selected => {
    setGroupId(selected ? selected.id : null);

    trackAnalyticsEvent('clicked_group_finder_group', {
      action: 'form_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'group_finder',
      context: {
        campaignId,
        // Pass our selected.id to avoid race condition with setting groupId state.
        groupId: selected ? selected.id : null,
        pageId,
      },
    });
  };

  // Don't display the form to signed up users.
  if (
    get(campaignSignupData, 'signups', []).length ||
    get(mutationData, 'createSignup')
  ) {
    return null;
  }

  // Button-specific text prop or campaign action text override. (Defaults to "Take Action").
  const buttonCopy = text || campaignActionText;

  const closedCampaign = isCampaignClosed(endDate);

  const AffiliateMessagingOptIn = () =>
    displayAffiliateOptIn && affiliateOptInContent ? (
      <div className="form-wrapper affiliate-opt-in">
        <label className="option -checkbox" htmlFor="opt_in">
          <input
            css={css`
              top: 4px !important;
            `}
            type="checkbox"
            id="opt_in"
            name="affiliate_opt_in"
            value={affiliateMessagingOptIn}
            defaultChecked={affiliateMessagingOptIn}
            className="form-checkbox opt_in_checkbox"
            onClick={() => setAffiliateMessagingOptIn(!affiliateMessagingOptIn)}
          />

          <TextContent>{affiliateOptInContent}</TextContent>
        </label>
      </div>
    ) : null;

  if (!groupType || closedCampaign) {
    return (
      <>
        <PrimaryButton
          className={className}
          onClick={handleSignup}
          text={closedCampaign ? 'Notify Me' : buttonCopy}
          isLoading={loading || mutationLoading}
        />

        <AffiliateMessagingOptIn />
      </>
    );
  }

  /**
   * TODO: Everything below should get moved into the GroupFinder component, so we'll simply
   * render a GroupFinder here, passing props like groupType, handleSignup, className, etc.
   */
  const groupLabel = siteConfig('chapter_group_type_ids', []).includes(
    `${groupType.id}`,
  )
    ? 'chapter'
    : 'school';

  return (
    <>
      <div className="my-3" data-testid="join-group-signup-form">
        <Card title="Join a group" className="rounded bordered">
          <div className="p-3">
            <GroupFinder
              context={{ campaignId, pageId }}
              groupLabel={groupLabel}
              groupType={groupType}
              onChange={handleGroupFinderChange}
            />

            <PrimaryButton
              attributes={{ 'data-testid': 'join-group-signup-button' }}
              className={`${className} py-2 md:py-3`}
              isDisabled={!groupId}
              isLoading={loading || mutationLoading}
              onClick={handleSignup}
              text="Join Group"
            />

            <p className="text-sm text-gray-500 pt-3 md:pt-0">
              Can&apos;t find your {groupLabel}? Email alisha@dosomething.org
              for help.
            </p>
          </div>
        </Card>
      </div>

      <AffiliateMessagingOptIn />
    </>
  );
};

CampaignSignupForm.propTypes = {
  displayAffiliateOptIn: PropTypes.bool,
  className: PropTypes.string,
  contextSource: PropTypes.string,
  groupType: PropTypes.object,
  signupCreated: PropTypes.func.isRequired,
  storeCampaignSignup: PropTypes.func.isRequired,
  text: PropTypes.string,
};

CampaignSignupForm.defaultProps = {
  displayAffiliateOptIn: false,
  className: null,
  contextSource: null,
  groupType: null,
  text: null,
};

export default CampaignSignupForm;
