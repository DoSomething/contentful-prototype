import { has, get } from 'lodash';

import { trackAnalyticsEvent } from '../helpers/analytics';

/**
 * Append additional information to the data to decorate it.
 *
 * @param  {Object} data
 * @param  {Object} state
 * @return {Object}
 */
const appendAdditionalData = (data, state) => {
  const updatedData = { ...data };

  if (get(state, 'campaign.type', null) === 'campaign') {
    updatedData.campaignId = get(state, 'campaign.campaignId', null);
    updatedData.contentfulId = get(state, 'campaign.id', null);
  }

  return updatedData;
};

/**
 * Middleware for handling Analytics actions.
 *
 * @deprecate Remove this middleware since we now use trackAnalyticsEvent() instead.
 */
const analyticsMiddleware = ({ getState }) => next => action => {
  if (!has(action, 'payload.meta.analytics')) {
    return next(action);
  }

  const event = action.payload.meta.analytics;

  // Decorate the data with some additional information if available.
  event.data = appendAdditionalData(event.payload, getState());

  trackAnalyticsEvent(event);

  return next(action);
};

export default analyticsMiddleware;
