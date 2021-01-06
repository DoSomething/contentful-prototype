/* global window document */

import { get } from 'lodash';
import localforage from 'localforage';

import { getDataForNorthstar } from '../selectors';
import { buildAuthRedirectUrl, isAuthenticated } from '../helpers/auth';

/**
 * Middleware for handling Authenticated actions.
 */
const requiresAuthenticationMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const requiresAuth = get(action, 'payload.requiresAuthentication', false);

  if (requiresAuth && !isAuthenticated()) {
    const actionId = `auth:${Date.now()}`;

    localforage.setItem(actionId, action).then(() => {
      const redirect = buildAuthRedirectUrl(
        getDataForNorthstar(state),
        actionId,
      );

      // If we're running our test suite, don't automatically initiate
      // the login redirect flow & leave something to assert on.
      if (window.Cypress) {
        document.body.innerHTML = `<div data-test="redirect" data-url="${redirect}" />`;
        return;
      }

      window.location.href = redirect;
    });

    return null;
  }

  return next(action);
};

export default requiresAuthenticationMiddleware;
