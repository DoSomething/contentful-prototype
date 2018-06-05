import React from 'react';
import PropTypes from 'prop-types';

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
}) => {
  if (isLegacyTemplate) {
    return null;
  }

  const linkablePages = pages
    .filter(page => page.type === 'page')
    // @TODO: we want to eventually remove the need for hideFromNavigation field
    // in favor of always linking to pages referenced in the `pages` field.
    .filter(page => !page.fields.hideFromNavigation);

  let campaignPages = linkablePages.map(page => ({
    id: page.id,
    slug: page.fields.slug,
    title: page.fields.title,
  }));

  // Conditional whether to include Community page.
  if (hasCommunityPage) {
    campaignPages.unshift({
      id: 'community-page',
      slug: 'community',
      title: 'Community',
    });
  }

  const hasActionPage = pages.find(
    page => page.type === 'page' && page.fields.slug.endsWith('action'),
  );

  // Conditional whether to include Action page.
  if (campaignPages.length && !isCampaignClosed && !hasActionPage) {
    campaignPages.unshift({
      id: 'action-page',
      slug: 'action',
      title: 'Action',
    });
  }

  campaignPages = campaignPages.map(page => ({
    ...page,
    slug: prepareCampaignPageSlug(campaignSlug, page.slug),
  }));

  return campaignPages.length ? (
    <PageNavigation pages={campaignPages}>
      {isAffiliated ? null : (
        <SignupButtonContainer
          className="-inline nav-button"
          source="tabbed navigation"
        />
      )}
    </PageNavigation>
  ) : null;
};

CampaignPageNavigation.propTypes = {
  campaignSlug: PropTypes.string.isRequired,
  hasCommunityPage: PropTypes.bool.isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  isCampaignClosed: PropTypes.bool.isRequired,
  isLegacyTemplate: PropTypes.bool.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.object,
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
};

CampaignPageNavigation.defaultProps = {
  pages: [],
};

export default CampaignPageNavigation;
