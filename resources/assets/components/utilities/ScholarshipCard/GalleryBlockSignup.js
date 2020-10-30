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
  getPageContext,
} from '../../../helpers/analytics';

export const CREATE_SIGNUP_MUTATION = gql`
  mutation CampaignSignupMutation($campaignId: Int!) {
    createSignup(campaignId: $campaignId) {
      id
    }
  }
`;

const GalleryBlockSignup = ({ campaignId, path }) => {
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

    if (!isAuthenticated()) {
      authenticate({ campaignId });
    }
    handleSignup();
  };

  useEffect(() => {
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
      href={path}
      text="Apply Now"
      onClick={handleScholarshipCardShareClick}
    />
  );
};

GalleryBlockSignup.propTypes = {
  campaignId: PropTypes.number,
  path: PropTypes.string,
};
GalleryBlockSignup.defaultProps = {
  campaignId: null,
  path: null,
};

export default GalleryBlockSignup;
