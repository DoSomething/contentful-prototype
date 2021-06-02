import React from 'react';
import PropTypes from 'prop-types';

const ReferAFriendIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 800"
    className={className}
    width="50"
    height="50"
  >
    <g fill="currentColor">
      <path d="M676.6,209.94H529.18c4.44-3.16,7-5.06,7-5.06a54.26,54.26,0,0,0-65.91-86.2s-6.64,5.16-16.49,13.63c.46-9.66.5-15.64.5-15.64a54.25,54.25,0,1,0-108.5,0s0,6,.5,15.64c-9.85-8.47-16.49-13.63-16.49-13.63a54.26,54.26,0,0,0-65.91,86.2s2.53,1.9,7,5.06H123.4a15.5,15.5,0,0,0-15.5,15.5V344a15.5,15.5,0,0,0,15.5,15.5h6.33V737.58a15.5,15.5,0,0,0,15.5,15.5H654.77a15.5,15.5,0,0,0,15.5-15.5V359.53h6.33A15.5,15.5,0,0,0,692.1,344V225.44A15.5,15.5,0,0,0,676.6,209.94ZM639.27,486H438.44V359.53H639.27Zm0,236.07H438.44V562.9H639.27Zm-275-481.14H661.1v87.59H138.9V240.94H364.25ZM160.73,359.53H361.56V486H160.73Zm0,203.37H361.56V722.08H160.73Z" />
    </g>
  </svg>
);

ReferAFriendIcon.propTypes = {
  className: PropTypes.string,
};

ReferAFriendIcon.defaultProps = {
  className: null,
};

export default ReferAFriendIcon;
