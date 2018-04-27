import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import NotFound from '../../NotFound';
import { isCampaignClosed } from '../../../helpers';
import { CallToActionContainer } from '../../CallToAction';
import ScrollConcierge from '../../ScrollConcierge';
import Enclosure from '../../Enclosure';
import DashboardContainer from '../../Dashboard/DashboardContainer';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-subpage.scss';

const CampaignSubPageContent = props => {
  const { campaignEndDate, match, noun, pages, tagline, verb } = props;

  const subPage = find(
    pages,
    page =>
      page.type === 'page'
        ? page.fields.slug.endsWith(match.params.slug)
        : false,
  );

  if (!subPage) {
    return <NotFound />;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  const ctaContent = `${tagline} Join hundreds of members and ${verb.plural} ${
    noun.plural
  }!`;

  return (
    <div className="clearfix padded campaign-subpage" id={subPage.id}>
      <div className="primary">
        <ScrollConcierge />
        <article className="padded bordered rounded bg-white">
          <h2 className="visually-hidden">{subPage.fields.title}</h2>

          <Markdown>{subPage.fields.content}</Markdown>
        </article>
      </div>

      {isClosed ? null : (
        <div className="secondary">
          <CallToActionContainer
            content={ctaContent}
            useCampaignTagline
            visualStyle="dark"
          />
        </div>
      )}

      {isClosed ? null : (
        <CallToActionContainer useCampaignTagline visualStyle="transparent" />
      )}
    </div>
  );
};

CampaignSubPageContent.propTypes = {
  campaignEndDate: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        content: PropTypes.string.isRequired,
      }),
    }),
  ),
  tagline: PropTypes.string,
  verb: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

CampaignSubPageContent.defaultProps = {
  pages: [],
  noun: {
    singular: 'action',
    plural: 'action',
  },
  tagline: 'Ready to start?',
  verb: {
    singular: 'take',
    plural: 'take',
  },
};

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignSubPage = props => (
  <div>
    <LedeBannerContainer />
    <div className="main clearfix">
      {props.dashboard ? <DashboardContainer /> : null}
      <CampaignPageNavigationContainer />
      <Enclosure className="default-container margin-top-lg margin-bottom-lg">
        <CampaignSubPageContent {...props} />
      </Enclosure>
      <CallToActionContainer sticky hideIfSignedUp />
    </div>
  </div>
);

CampaignSubPage.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
};

CampaignSubPage.defaultProps = {
  dashboard: null,
};

export default CampaignSubPage;
