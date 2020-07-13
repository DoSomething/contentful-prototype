import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import EmptyRegistrationImage from './empty-registration.svg';
import CompletedRegistrationImage from './completed-registration.svg';

const VoterRegistrationReferral = ({ displayName, id, isCompleted }) => (
  <div
    className="flex items-center py-4"
    key={id}
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
      <span className="font-bold block">{displayName}</span>
      <span className="italic">
        {isCompleted ? 'Registered' : 'Started Registration'}
      </span>
    </div>
  </div>
);

VoterRegistrationReferral.propTypes = {
  id: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired,
};

export default VoterRegistrationReferral;
