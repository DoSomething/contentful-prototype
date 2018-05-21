import { RestApiClient } from '@dosomething/gateway';

import { PHOENIX_URL } from '../constants';

/**
 * Send a GET request.
 *
 * @param  {Object} payload
 * @return {Object}
 */
export function getRequest(payload) {
  const client = new RestApiClient(PHOENIX_URL);

  // @TODO: modify headers to add token so Rogue returns all
  // data, including why_participated.

  // @TODO: handle success/error and add messages.
  return client.get(payload.url, payload.query);
}

/**
 * [getUserCampaignSignups description]
 * @param  {String} userId
 * @param  {String} campaignId
 * @param  {String|Null} campaignRunId
 * @return {Object}
 */
export function getUserCampaignSignups(
  userId,
  campaignId,
  campaignRunId = null,
) {
  return getRequest({
    query: {
      filter: {
        northstar_id: userId,
        campaign_run_id: campaignRunId,
      },
    },
    url: `${window.location.origin}/api/v2/campaigns/${campaignId}/signups`,
  });
}
