import React from 'react';
import PropTypes from 'prop-types';

import NavigationLink from '../Navigation/NavigationLink';
import { prepareCampaignPageSlugs } from '../../helpers/campaign';
import PageNavigation from '../utilities/PageNavigation/PageNavigation';

const CampaignPageNavigation = ({
  campaignSlug,
  hasCommunityPage,
  isAffiliated,
  isCampaignClosed,
  isLegacyTemplate,
  pages,
  pathname,
}) => {
  if (isLegacyTemplate) {
    return null;
  }

  console.log(pages);

  const linkablePages = pages
    .filter(page => page.type === 'page')
    // @TODO: we want to eventually remove the need for hideFromNavigation field
    // in favor of always linking to pages referenced in the `pages` field.
    .filter(page => !page.fields.hideFromNavigation);

  console.log(linkablePages);

  const pageSlugs = linkablePages.map(page => page.fields.slug);

  if (hasCommunityPage) {
    pageSlugs.unshift('community');
  }

  if (pageSlugs.length && !isCampaignClosed) {
    pageSlugs.unshift('action');
  }

  console.log(prepareCampaignPageSlugs(campaignSlug, pageSlugs));

  console.log('💃🏽');
  console.log(pageSlugs);

  return <PageNavigation>hello there!</PageNavigation>;
};

export default CampaignPageNavigation;

CampaignPageNavigation.propTypes = {
  campaignSlug: PropTypes.string.isRequired,
};
