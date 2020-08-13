import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import SecondaryButton from '../Button/SecondaryButton';

export const CREATE_SIGNUP_MUTATION = gql`
  mutation CampaignSignupMutation($campaignId: Int!) {
    createSignup(campaignId: $campaignId) {
      id
    }
  }
`;
const GalleryBlockSignup = ({ campaignId }) => {
  const [handleSignup] = useMutation(CREATE_SIGNUP_MUTATION, {
    variables: { campaignId },
  });

  return <SecondaryButton
    className="w-full"
    text="Apply Now"
    onClick={handleSignup}
  /> ? (
    <Redirect to={`/us/campaigns/${campaignId}`} />
  ) : null;
};

GalleryBlockSignup.propTypes = {
  campaignId: PropTypes.number.isRequired,
};

export default GalleryBlockSignup;
