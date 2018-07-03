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
  const { campaignEndDate, match, pages } = props;

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

  const renderBlocks = blocks =>
    blocks.map(block => (
      <div className="margin-vertical" key={block.id}>
        <ContentfulEntry json={block} />
      </div>
    ));

  return (
    <div className="clearfix padded campaign-page" id={subPage.id}>
      <ScrollConcierge />
      {subPage.fields.content ? (
        <div className="row">
          <div className="primary">
            <Markdown>{subPage.fields.content}</Markdown>
          </div>
          <div className="secondary">
            {renderBlocks(subPage.fields.sidebar)}
          </div>
        </div>
      ) : (
        renderBlocks(subPage.fields.blocks)
      )}

      {isClosed ? null : (
        <CallToActionContainer useCampaignTagline visualStyle="transparent" />
      )}
    </div>
  );
};

CampaignPageContent.propTypes = {
  campaignEndDate: PropTypes.string,
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
  pages: [],
  match: {
    params: {},
  },
};

export default CampaignPageContent;
