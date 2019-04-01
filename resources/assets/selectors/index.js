import { query } from '../helpers';
import { getCampaignDataForNorthstar } from './campaign';
import { getStoryPageDataForNorthstar } from './storyPage';

export function getDataForNorthstar(state) {
  return {
    ...getCampaignDataForNorthstar(state),
    ...getStoryPageDataForNorthstar(state),
    trafficSource: query('utm_medium'),
    referrerId: state.campaign.id || state.page.id,
  };
}

export default null;
