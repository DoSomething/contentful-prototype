import React from 'react';
import PropTypes from 'prop-types';

import PageNavigation from '../utilities/PageNavigation/PageNavigation';
import { isActionPage, prepareCampaignPageSlug } from '../../helpers/campaign';
import CampaignSignupFormContainer from '../CampaignSignupForm/CampaignSignupFormContainer';

const CampaignPageNavigation = ({
  campaignSlug,
  isAffiliated,
  isCampaignClosed,
  pages,
}) => {
  const linkablePages = pages
    .filter(page => page.type === 'page')
    // @TODO: we want to eventually remove the need for hideFromNavigation field
    // in favor of always linking to pages referenced in the `pages` field.
    .filter(page => !page.fields.hideFromNavigation)
    // Remove action page from navigaition list if campaign is closed.
    .filter(page => !isCampaignClosed || !isActionPage(page));

  const campaignPages = linkablePages.map(page => ({
    id: page.id,
    slug: prepareCampaignPageSlug(campaignSlug, page.fields.slug),
    title: page.fields.title,
  }));
  return campaignPages.length ? (
    <PageNavigation pages={campaignPages}>
      {isAffiliated ||
      window.sessionStorage.getItem('ungated_session') ? null : (
        <CampaignSignupFormContainer className="inline-block -inline nav-button" />
      )}
    </PageNavigation>
  ) : null;
};

CampaignPageNavigation.propTypes = {
  campaignSlug: PropTypes.string.isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  isCampaignClosed: PropTypes.bool.isRequired,
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
