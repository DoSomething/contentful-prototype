import { get } from 'lodash';

import { contentfulImageUrl } from '../helpers';

/**
 * Get Story Page data to showcase story page context in Northstar login interface.
 *
 * @param  {Object} state
 * @return {Object}
 */
export function getStoryPageDataForNorthstar(state) {
  const data = {};

  if (get(state, 'page.type', null) === 'storyPage') {
    const { title, subTitle, coverImage } = state.page.fields;

    data.title = title;
    data.callToAction = subTitle;
    data.coverImage = contentfulImageUrl(coverImage.url, '800', '600', 'fill');
  }

  return data;
}

export default null;
