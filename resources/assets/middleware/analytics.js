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
    updatedData.campaignId = get(state, 'campaign.id', null);
    updatedData.legacyCampaignId = get(
      state,
      'campaign.legacyCampaignId',
      null,
    );
    updatedData.legacyCampaignRunId = get(
      state,
      'campaign.legacyCampaignRunId',
      null,
    );
  }

  return updatedData;
};

/**
 * Middleware for handling Analytics actions.
 */
const analyticsMiddleware = ({ getState }) => next => action => {
  if (!has(action, 'payload.meta.analytics')) {
    return next(action);
  }

  const event = action.payload.meta.analytics;

  // Decorate the data with some additional information if available.
  const data = appendAdditionalData(event.payload, getState());

  trackAnalyticsEvent(event.name, data, event.service);

  return next(action);
};

export default analyticsMiddleware;
