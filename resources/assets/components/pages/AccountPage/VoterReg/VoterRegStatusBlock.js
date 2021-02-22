import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import checkmark from './checkmark.svg';
import {
  getTrackingSource,
  needToVerifyVoterRegStatuses,
  getCheckRegistrationStatusURL,
  isVerifiedCompletedVoterRegStatuses,
  isVerifiedIneligibleVoterRegStatuses,
  USER_VOTER_REGISTRATION_STATUS_QUERY,
} from '../../../../helpers/voter-registration';
import Spinner from '../../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';

import './voter-reg.scss';

const VoterRegStatusBlock = ({ userId }) => {
  const { loading, error, data } = useQuery(
    USER_VOTER_REGISTRATION_STATUS_QUERY,
    { variables: { userId } },
  );

  const registrationStatus = get(data, 'user.voterRegistrationStatus', null);

  const verifiedRegistrationStatus =
    isVerifiedIneligibleVoterRegStatuses(registrationStatus) ||
    isVerifiedCompletedVoterRegStatuses(registrationStatus);

  if (loading) {
    return <Spinner className="flex justify-center p-16" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  if (
    needToVerifyVoterRegStatuses(registrationStatus) ||
    verifiedRegistrationStatus
  ) {
    return (
      <div
        className={classnames('voter-reg flex items-center', {
          '-green':
            isVerifiedCompletedVoterRegStatuses(registrationStatus) ||
            registrationStatus === 'CONFIRMED',
        })}
      >
        {isVerifiedCompletedVoterRegStatuses(registrationStatus) ||
        registrationStatus === 'CONFIRMED' ? (
          <img
            className="pl-2 post-badge icon-check"
            src={checkmark}
            alt="hello"
          />
        ) : null}

        <div className="m-3">
          {isVerifiedCompletedVoterRegStatuses(registrationStatus) ? (
            <p data-testid="complete-registration-status">
              Your voter registration is confirmed.
            </p>
          ) : (
            <p data-testid="uncertain-registration-status">
              {registrationStatus === 'CONFIRMED'
                ? 'You are registered to vote. Confirm that your registration is up-to-date '
                : 'Check your voter registration status'}{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={getCheckRegistrationStatusURL()}
              >
                here
              </a>
              .
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="unregistered-voting-status"
      className="voter-reg flex items-center"
    >
      <div className="m-3" data-testid="unregistered-status">
        <p>We don&#39;t have your voter registration.</p>
        <a
          href={`https://vote.dosomething.org/?r=${getTrackingSource(
            'web',
            'profile',
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base"
        >
          Register here
        </a>
      </div>
    </div>
  );
};

VoterRegStatusBlock.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default VoterRegStatusBlock;
