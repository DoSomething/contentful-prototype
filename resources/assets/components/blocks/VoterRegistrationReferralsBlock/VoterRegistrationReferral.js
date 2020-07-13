import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import EmptyRegistrationImage from './empty-registration.svg';
import CompletedRegistrationImage from './completed-registration.svg';

const VoterRegistrationReferral = ({ isCompleted, label }) => (
  <div
    className="flex items-center py-4"
    css={css`
      border-bottom: 1px solid ${tailwind('colors.gray.200')};
    `}
  >
    <div style={{ width: 80 }} className="pr-4">
      <img
        src={isCompleted ? CompletedRegistrationImage : EmptyRegistrationImage}
        alt={isCompleted ? 'Registered' : 'Started Registration'}
      />
    </div>
    <div>
      <span className="font-bold block">{label}</span>
      <span className="italic">
        {isCompleted ? 'Registered' : 'Started Registration'}
      </span>
    </div>
  </div>
);

VoterRegistrationReferral.propTypes = {
  label: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default VoterRegistrationReferral;
