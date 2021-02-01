import { get } from 'lodash';

import { getUtms, query } from '../helpers/url';
import { getCampaign } from '../helpers/campaign';
import { withoutValueless } from '../helpers/data';

const getStoryPage = () => {
  if (get(window.STATE, 'page.type', null) !== 'storyPage') {
    return undefined;
  }

  return get(window.STATE, 'page.fields');
};

export function getDataForNorthstar(state) {
  return withoutValueless({
    // Used as 'destination' parameter for customized destination title on Northstar login page.
    title: get(getCampaign(), 'title') || get(getStoryPage(), 'title'),
    // For 'source_details':
    contentful_id: state.campaign.id || state.page.id,
    mode: query('mode') || null,
    referrer_user_id: query('referrer_user_id'),
    ...getUtms(),
  });
}

export default null;
