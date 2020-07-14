import React from 'react';
import PropTypes from 'prop-types';

import EmptyRegistrationImage from './empty-registration.svg';
import CompletedRegistrationImage from './completed-registration.svg';

const VoterRegistrationReferral = ({ isCompleted, label }) => (
  <div
    className="flex items-center py-4"
    data-testid={`voter-registration-referral-${
      isCompleted ? 'completed' : 'started'
    }`}
  >
    <div style={{ width: 80 }} className="pr-4">
      <img
        src={isCompleted ? CompletedRegistrationImage : EmptyRegistrationImage}
        alt={isCompleted ? 'Registered' : 'Started Registration'}
      />
    </div>

    <div>
      <span
        className="font-bold block"
        data-testid="voter-registration-referral-label"
      >
        {label}
      </span>

      <span className="italic">
        {isCompleted ? 'Registered' : 'Started Registration'}
      </span>
    </div>
  </div>
);

VoterRegistrationReferral.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default VoterRegistrationReferral;
