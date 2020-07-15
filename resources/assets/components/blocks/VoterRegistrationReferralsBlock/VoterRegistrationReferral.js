import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import StartedRegistrationImage from './started-registration.svg';
import CompletedRegistrationImage from './completed-registration.svg';

const VoterRegistrationReferral = ({ index, isCompleted, label }) => (
  <div
    className="flex items-center py-4"
    css={
      index === 0
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
        src={
          isCompleted ? CompletedRegistrationImage : StartedRegistrationImage
        }
        alt={
          isCompleted
            ? 'Graphic of a box with checkmark'
            : 'Graphic of an empty box'
        }
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
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

VoterRegistrationReferral.defaultProps = {
  isCompleted: false,
};

export default VoterRegistrationReferral;
