import React from 'react';
import PropTypes from 'prop-types';

import NavigationLink from '../Navigation/NavigationLink';
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

  const pageSlugs = pages.map(page => page.fields.slug);

  if (hasCommunityPage) {
    pageSlugs.unshift('community');
  }

  if (pageSlugs.length && !isCampaignClosed) {
    pageSlugs.unshift('action');
  }

  console.log('💃🏽');
  console.log(pageSlugs);

  return <PageNavigation>hello there!</PageNavigation>;
};

export default CampaignPageNavigation;

CampaignPageNavigation.propTypes = {
  campaignSlug: PropTypes.string.isRequired,
};
