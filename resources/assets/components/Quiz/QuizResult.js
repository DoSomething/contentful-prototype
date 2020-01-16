import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { isAuthenticated } from '../../helpers/auth';
import ContentfulEntryLoader from '../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

export const CREATE_SIGNUP_MUTATION = gql`
  mutation QuizSignupMutation($campaignId: Int!) {
    createSignup(campaignId: $campaignId) {
      id
    }
  }
`;

const QuizResult = ({ id, campaignId }) => {
  const [createSignup] = useMutation(CREATE_SIGNUP_MUTATION, {
    variables: { campaignId },
  });

  // If the user is logged-in, we'll create a signup to mark
  // that they've "completed" this quiz:
  useEffect(() => {
    if (isAuthenticated()) {
      createSignup();
    }
  }, [id]);

  return <ContentfulEntryLoader id={id} />;
};

QuizResult.propTypes = {
  id: PropTypes.string.isRequired,
  campaignId: PropTypes.number.isRequired,
};

export default QuizResult;
