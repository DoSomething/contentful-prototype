import { getUtmParameters } from '../helpers/utm';
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
    ...getUtmParameters(),
  });
}

export default null;
