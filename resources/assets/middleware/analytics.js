import { get } from 'lodash';
import { Engine as PuckClient } from '@dosomething/puck-client';

import { get as getHistory } from '../history';
import { PUCK_URL } from '../constants';
import { getUserId } from '../selectors/user';
import { TRACK_ANALYTICS_EVENT } from '../constants/action-types';

/**
 * Send event to analyze with Google Analytics.
 *
 * @param  {String} name
 * @param  {Object} data
 * @return {void}
 */
const analyzeWithGoogleAnalytics = (name, data) => {
  console.log('analyze event using Google Analytics');
  console.log(name);
  console.log(data);
};

/**
 * Send event to analyze with Puck.
 *
 * @param  {String} name
 * @param  {Object} data
 * @param  {Object} state
 * @return {void}
 */
const analyzeWithPuck = (name, data, state) => {
  const Puck = new PuckClient({
    source: 'phoenix-next',
    // Not sure why Puck Client needs this as a function:
    getUser: () => getUserId(state),
    puckUrl: PUCK_URL,
    history: getHistory(),
  });

  Puck.trackEvent(name, data);
};

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
    updatedData.campaignID = get(state, 'campaign.id', null);
    updatedData.legacyCampaignId = get(state, 'campaign.legacyCampaignId', null);
    updatedData.legacyCampaignRunId = get(state, 'campaign.legacyCampaignRunId', null);
  }

  return updatedData;
};

/**
 * Middleware for handling Analytics actions.
 */
const analyticsMiddleware = ({ getState }) => next => (action) => {
  if (action.type !== TRACK_ANALYTICS_EVENT) {
    return next(action);
  }

  const { payload } = action;

  // Decorate the data with some additional information if available.
  const data = appendAdditionalData(payload.data, getState());

  switch (action.meta.service) {
    case 'ga':
      analyzeWithGoogleAnalytics(payload.name, data);
      break;

    case 'puck':
      analyzeWithPuck(payload.name, data, getState());
      break;

    default:
      console.error(`The "${action.meta.service}" service is missing, not supported or incorrect!`);
  }

  return next(action);
};

export default analyticsMiddleware;
