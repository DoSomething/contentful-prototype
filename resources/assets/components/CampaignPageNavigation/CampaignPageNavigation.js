import React from 'react';
import PropTypes from 'prop-types';

import NavigationLink from '../Navigation/NavigationLink';
import { prepareCampaignPageSlug } from '../../helpers/campaign';
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

  const campaignPages = linkablePages.map(page => {
    return {
      id: page.id,
      slug: page.fields.slug,
      title: page.fields.title,
    };
  });

  console.log(campaignPages);

  // Conditional whether to include Community page.
  if (hasCommunityPage) {
    campaignPages.unshift({
      id: 'community-page',
      slug: 'community',
      title: 'Community',
    });
  }

  // Conditional whether to include Action page.
  if (campaignPages.length && !isCampaignClosed) {
    campaignPages.unshift({
      id: 'action-page',
      slug: 'action',
      title: 'Action',
    });
  }

  campaignPages.map(
    page => (page.slug = prepareCampaignPageSlug(campaignSlug, page.slug)),
  );

  console.log('💃🏽');
  console.log(campaignPages);

  return (
    <PageNavigation pages={campaignPages}>
      <div className="-inline nav-button">hello there!</div>
    </PageNavigation>
  );
};

export default CampaignPageNavigation;

CampaignPageNavigation.propTypes = {
  campaignSlug: PropTypes.string.isRequired,
};
