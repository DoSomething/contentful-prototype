import { get } from 'lodash';

import { queue } from '../helpers';
import { buildLoginRedirectUrl } from '../helpers';
import { isAuthenticated } from '../selectors/user';
import { getCampaignDataForNorthstar } from '../selectors/campaign';

const requiresAuthenticationMiddleware = ({ getState }) => next => action => {
  const state = getState();
  const requiresAuth = get(action, 'payload.requiresAuthentication', false);

  if (requiresAuth && !isAuthenticated(state)) {
    // queue()
    //   .reset()
    //   .then(() => {
    //     queue()
    //       .enqueue(action)
    //       .then(() => {
    //         console.log('💫 go to Northstar login...');

    //         window.location.href = buildLoginRedirectUrl(
    //           getCampaignDataForNorthstar(state),
    //         );
    //       });
    //   });

    localforage.setItem(`auth:${hash(action)}`, action).then(() => {
      console.log('💫 go to Northstar login...');

      window.location.href = buildLoginRedirectUrl(
        getCampaignDataForNorthstar(state),
      );
    });
  }

  return next(action);
};

export default requiresAuthenticationMiddleware;
