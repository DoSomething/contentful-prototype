import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

export const SingleLevel = ({ color, levelProgress }) => (
  <div className="relative">
    <div
      className={`${color} h-full`}
      css={css`
        width: ${levelProgress};
        border-radius: 50px;
      `}
    />

    <div
      className={`${color} h-8 w-8 absolute border border-solid border-white rounded-full z-10`}
      css={css`
        top: -10px;
        right: -16px;
      `}
    />
  </div>
);

SingleLevel.propTypes = {
  color: PropTypes.string.isRequired,
  levelProgress: PropTypes.string.isRequired,
};

const MultiLevelProgressBar = ({ children, levelLabels }) => {
  const progressBarContainer = css`
    height: 12px;
    border-radius: 50px;
  `;

  // add a children prop and a levels props
  // replace the multiple props with a levelLabels prop
  // map through the levelLabels to display the labels
  // display the child prop inside the first grid div
  return (
    <div>
      <div
        className="grid grid-cols-3 bg-gray-300 pr-4 lg:pr-0 mb-3 w-full"
        css={progressBarContainer}
      >
        {children}
      </div>

      <div className="grid grid-cols-3 pr-4 lg:pr-0 mb-10 w-full">
        {levelLabels.map(level => {
          return (
            <div className="text-right">
              <span className="font-bold">{level.label}</span> <br />{' '}
              {level.subLabel || null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

MultiLevelProgressBar.propTypes = {
  children: PropTypes.object.isRequired,
  levelLabels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
    }),
  ).isRequired,
};

export default MultiLevelProgressBar;
