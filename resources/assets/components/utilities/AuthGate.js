import React from 'react';
import PropTypes from 'prop-types';

import Placeholder from './Placeholder';
import {
  buildAuthRedirectUrl,
  isAuthenticated,
  redirect,
} from '../../helpers/auth';

const AuthGate = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }

  const redirectUrl = buildAuthRedirectUrl();
  redirect(redirectUrl);

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
