import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { isAuthenticated } from '../../../helpers/auth';

export const CREATE_SIGNUP_MUTATION = gql`
  mutation CampaignSignupMutation($campaignId: Int!) {
    createSignup(campaignId: $campaignId) {
      id
    }
  }
`;
const GalleryBlockSignup = ({ id, campaignId }) => {
  const [handleSignup] = useMutation(CREATE_SIGNUP_MUTATION, {
    variables: { campaignId },
  });

  useEffect(() => {
    if (isAuthenticated()) {
      handleSignup();
    }
  }, [id]);

  return <Redirect to={`/us/campaigns/${campaignId}`} />;
};

GalleryBlockSignup.propTypes = {
  id: PropTypes.string.isRequired,
  campaignId: PropTypes.number.isRequired,
};

export default GalleryBlockSignup;
