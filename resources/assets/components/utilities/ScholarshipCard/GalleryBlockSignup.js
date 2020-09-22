import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import SecondaryButton from '../Button/SecondaryButton';

export const CREATE_SIGNUP_MUTATION = gql`
  mutation CampaignSignupMutation($campaignId: Int!) {
    createSignup(campaignId: $campaignId) {
      id
    }
  }
`;
const GalleryBlockSignup = ({ campaignId, path }) => {
  const [handleSignup, { called, error }] = useMutation(
    CREATE_SIGNUP_MUTATION,
    {
      variables: { campaignId },
    },
  );

  if (called && !error) {
    return (window.location = { path });
  }

  if (error) {
    // TODO: show error state…
  }

  return (
    <SecondaryButton
      className="w-full"
      text="Apply Now"
      onClick={handleSignup}
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
