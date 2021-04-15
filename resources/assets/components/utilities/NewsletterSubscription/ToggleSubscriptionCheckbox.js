import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { NEWSLETTER_TOPICS } from './config';
import { tailwind } from '../../../helpers/display';
import CheckIcon from '../../artifacts/CheckIcon/CheckIcon';

const ToggleSubscriptionCheckbox = ({ topic, updateSubscriptions }) => {
  return (
    <label
      htmlFor={`${topic}-subscription`}
      className="bg-gray-200 border-2 border-gray-300 focus:border-blurple-300 border-solid cursor-pointer h-8 mt-4 mx-auto relative rounded w-8"
      css={css`
        .check-input {
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
        }

        input:checked + .check-input {
          opacity: 1;
        }
      `}
    >
      <input
        className="absolute appearance-none focus:outline-2 focus:outline-blurple-100 focus:outline-solid h-8 w-8"
        css={css`
          left: -2px;
          top: -2px;
        `}
        id={`${topic}-subscription`}
        name={`${topic}-subscription`}
        onClick={() => updateSubscriptions(topic)}
        type="checkbox"
      />
      <span className="check-input absolute items-center flex inset-0 justify-center pointer-events-none w-full">
        <CheckIcon color={tailwind('colors.blurple.500')} height="18px" />
      </span>
    </label>
  );
};

ToggleSubscriptionCheckbox.propTypes = {
  topic: PropTypes.oneOf(Object.keys(NEWSLETTER_TOPICS)).isRequired,
  updateSubscriptions: PropTypes.func.isRequired,
};

export default ToggleSubscriptionCheckbox;
