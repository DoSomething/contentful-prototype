import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import SecondaryButton from '../Button/SecondaryButton';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import { useGate, isAuthenticated } from '../../../helpers/auth';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

export const CREATE_SIGNUP_MUTATION = gql`
  mutation CampaignSignupMutation($campaignId: Int!) {
    createSignup(campaignId: $campaignId) {
      id
    }
  }
`;

const GalleryBlockSignup = ({ campaignId, campaignTitle, path }) => {
  const [handleSignup, { loading, data, error }] = useMutation(
    CREATE_SIGNUP_MUTATION,
    {
      variables: { campaignId },
    },
  );

  const [flash, authenticate] = useGate(
    `OneClickSignupCampaignId:${campaignId}`,
  );

  const handleScholarshipCardShareClick = event => {
    event.preventDefault();

    trackAnalyticsEvent('clicked_signup', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.signup,
      label: campaignTitle,
      context: {
        url: path,
        contextSource: 'scholarship_card',
      },
    });

    trackAnalyticsEvent('completed_signup', {
      action: 'signup_completed',
      category: EVENT_CATEGORIES.campaignAction,
      label: campaignTitle,
      context: {
        url: path,
        contextSource: 'scholarship_card',
      },
    });
    return isAuthenticated() ? handleSignup() : authenticate({ campaignId });
  };

  useEffect(() => {
    // If we're returning from the authentication flow with a "flashed" campaign ID, complete the signup:
    if (isAuthenticated() && flash.campaignId === campaignId) {
      handleSignup();
    }
  }, [flash]);

  if (loading) {
    return <Spinner className="flex justify-center p-4" />;
  }

  if (data) {
    window.location = path;

    return <Spinner className="flex justify-center p-4" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return (
    <SecondaryButton
      className="w-full"
      text="Apply Now"
      onClick={handleScholarshipCardShareClick}
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
