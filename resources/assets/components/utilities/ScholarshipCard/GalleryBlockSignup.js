import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import SecondaryButton from '../Button/SecondaryButton';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import { useGate, isAuthenticated, getUserId } from '../../../helpers/auth';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
  getPageContext,
} from '../../../helpers/analytics';

export const CREATE_SIGNUP_MUTATION = gql`
  mutation CampaignSignupMutation($campaignId: Int!) {
    createSignup(campaignId: $campaignId) {
      id
    }
  }
`;

export const SEARCH_USER_CAMPAIGN_QUERY = gql`
  query SearchUserCampaignQuery($userId: String!, $campaignId: String!) {
    signups(userId: $userId, campaignId: $campaignId) {
      id
      campaignId
    }
  }
`;

const GalleryBlockSignup = ({ path, campaignId, campaignTitle }) => {
  const {
    data: campaignData,
    loading: loadingCampaign,
    error: errorCampaign,
  } = useQuery(SEARCH_USER_CAMPAIGN_QUERY, {
    variables: {
      userId: getUserId(),
      campaignId: campaignId.toString(),
    },
    skip: !window.AUTH.id,
  });

  const [handleSignup, { loading, data, error }] = useMutation(
    CREATE_SIGNUP_MUTATION,
    {
      variables: {
        campaignId,
      },
      onCompleted: () => {
        trackAnalyticsEvent('completed_signup', {
          action: 'signup_completed',
          category: EVENT_CATEGORIES.campaignAction,
          label: campaignTitle,
          context: {
            contextSource: 'scholarship_card',
            ...getPageContext(),
          },
        });
      },
    },
  );

  const [flash, authenticate] = useGate(
    `OneClickSignupCampaignId:${campaignId}`,
  );

  const handleScholarshipCardShareClick = event => {
    event.preventDefault();

    trackAnalyticsEvent('clicked_scholarship_gallery_block_apply_now', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'scholarship_gallery_card',
      context: {
        url: path,
        ...getPageContext(),
        campaignId,
      },
    });

    return isAuthenticated()
      ? handleSignup()
      : authenticate({
          campaignId,
        });
  };

  const handleViewApplicationButtonClick = () => {
    trackAnalyticsEvent('clicked_scholarship_gallery_block_view_application', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'scholarship_gallery_card',
      context: {
        url: path,
        campaignId,
        ...getPageContext(),
      },
    });
  };

  useEffect(() => {
    // If we're returning from the authentication flow with a "flashed" campaign ID, complete the signup:
    if (isAuthenticated() && flash.campaignId === campaignId) {
      handleSignup();
    }
  }, [flash]);

  if (loading || loadingCampaign) {
    return <Spinner className="flex justify-center p-4" />;
  }

  if (data) {
    window.location = path;

    return <Spinner className="flex justify-center p-4" />;
  }

  if (error || errorCampaign) {
    return <ErrorBlock error={error} />;
  }

  return (
    <SecondaryButton
      className="w-full"
      text={
        campaignData && campaignData.signups.length
          ? 'View Application'
          : 'Apply Now'
      }
      href={path}
      onClick={() => {
        if (campaignData && campaignData.signups.length) {
          handleViewApplicationButtonClick();
        } else {
          handleScholarshipCardShareClick();
        }
      }}
    />
  );
};

GalleryBlockSignup.propTypes = {
  campaignId: PropTypes.number,
  campaignTitle: PropTypes.string,
  path: PropTypes.string,
};
GalleryBlockSignup.defaultProps = {
  campaignId: null,
  campaignTitle: null,
  path: null,
};

export default GalleryBlockSignup;
