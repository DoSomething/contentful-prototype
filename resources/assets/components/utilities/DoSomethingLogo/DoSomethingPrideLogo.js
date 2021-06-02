import React from 'react';
import Proptypes from 'prop-types';

import dosomethingPrideLogo from './dosomething_pride_logo.svg';

const DoSomethingPrideLogo = ({ className }) => (
  <img
    className={className}
    src={dosomethingPrideLogo}
    alt="DoSomething logo"
    style={{ pointerEvents: 'none' }}
  />
);

DoSomethingPrideLogo.propTypes = {
  className: Proptypes.string,
};

DoSomethingPrideLogo.defaultProps = {
  className: null,
};

export default DoSomethingPrideLogo;
