import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import checkmark from './checkmark.svg';
import pendingIcon from './pendingIcon.svg';
import rejectedIcon from './rejectedIcon.svg';
import Spinner from '../../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';

import './voter-reg.scss';

const USER_VOTER_REGISTRATION_STATUS_QUERY = gql`
  query userVoterRegistrationStatusQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

const VoterRegStatusBlock = ({ userId }) => {
  const options = { variables: { userId } };

  const { loading, error, data } = useQuery(
    USER_VOTER_REGISTRATION_STATUS_QUERY,
    options,
  );

  const registrationStatus = get(data, 'user.voterRegistrationStatus', null);

  if (loading) {
    return <Spinner className="flex justify-center p-16" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  if (registrationStatus === 'UNCERTAIN') {
    return (
      <div className="voter-reg -yellow flex items-center">
        <img className="post-badge icon-clock" src={pendingIcon} alt="hello" />
        <div className="ml-3">Your voter reg status is pending!</div>
      </div>
    );
  }

  if (
    registrationStatus === 'CONFIRMED' ||
    registrationStatus === 'REGISTRATION_COMPLETE' ||
    registrationStatus === 'INELIGIBLE'
  ) {
    return (
      <div className="voter-reg -green flex items-center">
        <img className="post-badge icon-check" src={checkmark} alt="hello" />
        <div className="ml-3">Your voter reg status is confirmed! Woo!</div>
      </div>
    );
  }

  return (
    <div className="voter-reg -red flex items-center">
      <img className="post-badge icon-x" src={rejectedIcon} alt="hello" />
      <div className="ml-3">
        We don&#39;t have your voter registration. Register here!
      </div>
    </div>
  );
};

VoterRegStatusBlock.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default VoterRegStatusBlock;
