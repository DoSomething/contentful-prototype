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
const GalleryBlockSignup = ({ campaignId, slug }) => {
  const [handleSignup, { called, error }] = useMutation(
    CREATE_SIGNUP_MUTATION,
    {
      variables: { campaignId },
    },
  );

  if (called && !error) {
    return <Redirect to={`/us/campaigns/${slug}`} />;
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
  slug: PropTypes.string,
};
GalleryBlockSignup.defaultProps = {
  campaignId: null,
  slug: null,
};

export default GalleryBlockSignup;
