import React from 'react';
import PropTypes from 'prop-types';

const VoterRegistration = (props) => {
  const { userId, campaignRunId } = props;

  // Ignore the weird query format and the mismatching names. Wasn't our decision.
  const query = `?r=user:${userId},campaign:${campaignRunId},source:web`;

  return (
    <p>{query}</p>
  );
};

VoterRegistration.propTypes = {
  userId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.number.isRequired,
};

export default VoterRegistration;
