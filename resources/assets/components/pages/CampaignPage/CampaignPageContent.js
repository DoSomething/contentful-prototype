import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import NotFound from '../../NotFound';
import { isCampaignClosed } from '../../../helpers';
import ScrollConcierge from '../../ScrollConcierge';
import ContentfulEntry from '../../ContentfulEntry';
import Markdown from '../../utilities/Markdown/Markdown';
import { CallToActionContainer } from '../../CallToAction';

const CampaignPageContent = props => {
  const { campaignEndDate, isCommunity, match, pages } = props;

  const pageSlug = isCommunity ? 'community' : match.params.slug;

  const subPage = find(
    pages,
    page =>
      page.type === 'page' ? page.fields.slug.endsWith(pageSlug) : false,
  );

  if (!subPage) {
    return <NotFound />;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  return (
    <div className="clearfix padded campaign-page" id={subPage.id}>
      <div>
        <ScrollConcierge />
        {subPage.fields.content ? (
          <Markdown>{subPage.fields.content}</Markdown>
        ) : (
          subPage.fields.blocks.map(block => (
            <div className="margin-vertical" key={block.id}>
              <ContentfulEntry json={block} />
            </div>
          ))
        )}
      </div>

      {isClosed ? null : (
        <CallToActionContainer useCampaignTagline visualStyle="transparent" />
      )}
    </div>
  );
};

CampaignPageContent.propTypes = {
  campaignEndDate: PropTypes.string,
  isCommunity: PropTypes.bool,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        content: PropTypes.string,
        blocks: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
  ),
};

CampaignPageContent.defaultProps = {
  campaignEndDate: null,
  isCommunity: false,
  pages: [],
  match: {
    params: {},
  },
};

export default CampaignPageContent;
