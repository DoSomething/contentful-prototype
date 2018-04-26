import React from 'react';
import PropTypes from 'prop-types';

import NavigationLink from '../Navigation/NavigationLink';
import { prepareCampaignPageSlug } from '../../helpers/campaign';
import PageNavigation from '../utilities/PageNavigation/PageNavigation';
import SignupButtonContainer from '../SignupButton/SignupButtonContainer';

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

  const linkablePages = pages
    .filter(page => page.type === 'page')
    // @TODO: we want to eventually remove the need for hideFromNavigation field
    // in favor of always linking to pages referenced in the `pages` field.
    .filter(page => !page.fields.hideFromNavigation);

  const campaignPages = linkablePages.map(page => {
    return {
      id: page.id,
      slug: page.fields.slug,
      title: page.fields.title,
    };
  });

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

  return (
    <PageNavigation pages={campaignPages}>
      {isAffiliated ? null : (
        <SignupButtonContainer
          className="-inline nav-button"
          source="tabbed navigation"
        />
      )}
    </PageNavigation>
  );
};

export default CampaignPageNavigation;

CampaignPageNavigation.propTypes = {
  campaignSlug: PropTypes.string.isRequired,
};
