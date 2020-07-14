import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import EmptyRegistrationImage from './empty-registration.svg';
import CompletedRegistrationImage from './completed-registration.svg';

const VoterRegistrationReferral = ({ isCompleted, isFirst, label }) => (
  <div
    className="flex items-center py-4"
    css={
      isFirst
        ? null
        : css`
            border-top: 1px solid ${tailwind('colors.gray.200')};
          `
    }
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
  isCompleted: PropTypes.bool,
  isFirst: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

VoterRegistrationReferral.propTypes = {
  isCompleted: false,
  isFirst: false,
};

export default VoterRegistrationReferral;
