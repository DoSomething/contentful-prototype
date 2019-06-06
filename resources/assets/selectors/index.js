import { query } from '../helpers';
import { getCampaignDataForNorthstar } from './campaign';
import { getStoryPageDataForNorthstar } from './storyPage';

export function getDataForNorthstar(state) {
  return {
    ...getCampaignDataForNorthstar(state),
    ...getStoryPageDataForNorthstar(state),

    // @TODO: Remove this once Northstar uses standard names, below.
    trafficSource: query('utm_medium'),
    referrerId: state.campaign.id || state.page.id,

    // For 'source_details':
    contentful_id: state.campaign.id || state.page.id,
    utm_source: query('utm_source'),
    utm_medium: query('utm_medium'),
    utm_campaign: query('utm_campaign'),
  };
}

export default null;
