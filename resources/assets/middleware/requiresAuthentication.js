import { get } from 'lodash';
import localforage from 'localforage';

import {
  buildAuthRedirectUrl,
  isAuthenticated,
  redirect,
} from '../helpers/auth';

/**
 * Middleware for handling Authenticated actions.
 */
const requiresAuthenticationMiddleware = () => next => action => {
  const requiresAuth = get(action, 'payload.requiresAuthentication', false);

  if (requiresAuth && !isAuthenticated()) {
    const actionId = `auth:${Date.now()}`;

    localforage.setItem(actionId, action).then(() => {
      const redirectUrl = buildAuthRedirectUrl(null, actionId);
      redirect(redirectUrl);
    });

    return null;
  }

  return next(action);
};

export default requiresAuthenticationMiddleware;
