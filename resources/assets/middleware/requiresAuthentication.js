import { get } from 'lodash';

import { queue } from '../helpers';
import { buildLoginRedirectUrl } from '../helpers';
import { isAuthenticated } from '../selectors/user';
import { getCampaignDataForNorthstar } from '../selectors/campaign';

const requiresAuthenticationMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const requiresAuth = get(action, 'payload.requiresAuthentication', false);

  if (requiresAuth && !isAuthenticated(state)) {
    console.log('😎');

    queue()
      .enqueue(action)
      .then(() => {
        console.log('💫 go to Northstar login...');

        window.location.href = buildLoginRedirectUrl(
          getCampaignDataForNorthstar(state),
        );

        return;
      });
  }

  return next(action);
};

export default requiresAuthenticationMiddleware;
