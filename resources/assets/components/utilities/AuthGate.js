import React from 'react';
import PropTypes from 'prop-types';

import Placeholder from './Placeholder';
import { buildAuthRedirectUrl, isAuthenticated } from '../../helpers/auth';

const AuthGate = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }

  const redirect = buildAuthRedirectUrl();

  // If we're running our test suite, don't automatically initiate
  // the login redirect flow & leave something to assert on.
  if (window.Cypress) {
    document.body.innerHTML = `<div data-test="redirect" data-url="${redirect}" />`;
    return null;
  }

  window.location.href = redirect;
  return <Placeholder />;
};

AuthGate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default AuthGate;
