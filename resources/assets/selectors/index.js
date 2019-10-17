import { query, withoutValueless } from '../helpers';
import { getCampaignDataForNorthstar } from './campaign';
import { getStoryPageDataForNorthstar } from './storyPage';

export function getDataForNorthstar(state) {
  return withoutValueless({
    ...getCampaignDataForNorthstar(state),
    ...getStoryPageDataForNorthstar(state),

    // For 'source_details':
    contentful_id: state.campaign.id || state.page.id,
    mode: query('mode') || null,
    referrer_user_id: query('referrer_user_id'),
    utm_source: query('utm_source'),
    utm_medium: query('utm_medium'),
    utm_campaign: query('utm_campaign'),
  });
}

export default null;
