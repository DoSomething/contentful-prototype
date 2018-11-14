/* global window */

import { get } from 'lodash';
import localforage from 'localforage';

import { buildLoginRedirectUrl } from '../helpers';
import { isAuthenticated } from '../selectors/user';
import { getCampaignDataForNorthstar } from '../selectors/campaign';

/**
 * Middleware for handling Authenticated actions.
 */
const requiresAuthenticationMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const requiresAuth = get(action, 'payload.requiresAuthentication', false);

  if (requiresAuth && !isAuthenticated(state)) {
    const actionId = `auth:${Date.now()}`;

    localforage.setItem(actionId, action).then(() => {
      window.location.href = buildLoginRedirectUrl(
        getCampaignDataForNorthstar(state),
        actionId,
      );
    });
  }

  return next(action);
};

export default requiresAuthenticationMiddleware;
