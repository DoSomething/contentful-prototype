import React from 'react';
import { join } from 'path';
import PropTypes from 'prop-types';

const VoterRegistration = (props) => {
  const { userId, campaignRunId } = props;

  // Ignore the weird query format and the mismatching names. Wasn't our decision.
  const query = `?r=user:${userId},campaign:${campaignRunId},source:web`;

  return (
    <p className="margin-horizontal-md"><a href={join('/', query)}>TurboVote Link example</a></p>
  );
};

VoterRegistration.propTypes = {
  userId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.number.isRequired,
};

export default VoterRegistration;
