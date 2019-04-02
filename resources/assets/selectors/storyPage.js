import { get } from 'lodash';

import { contentfulImageUrl } from '../helpers';

/**
 * Get Story Page data to showcase story page context in Northstar login interface.
 *
 * @param  {Object} state
 * @return {Object}
 */
export function getStoryPageDataForNorthstar(state) {
  if (get(state, 'page.type', null) !== 'storyPage') {
    return {};
  }

  const { title, subTitle, coverImage } = state.page.fields;

  return {
    title,
    callToAction: subTitle,
    coverImage: contentfulImageUrl(coverImage.url, '800', '600', 'fill'),
  };
}

export default null;
