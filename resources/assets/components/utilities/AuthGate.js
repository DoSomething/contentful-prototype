import React from 'react';
import PropTypes from 'prop-types';

import Placeholder from './Placeholder';
import { withoutValueless } from '../../helpers/data';
import {
  buildAuthRedirectUrl,
  isAuthenticated,
  redirect,
} from '../../helpers/auth';

const AuthGate = ({ children, mode }) => {
  if (isAuthenticated()) {
    return children;
  }

  const redirectUrl = buildAuthRedirectUrl({
    options: withoutValueless({ mode }),
  });

  redirect(redirectUrl);

  return <Placeholder />;
};

AuthGate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  mode: PropTypes.string,
};

AuthGate.defaultProps = {
  mode: null,
};

export default AuthGate;
