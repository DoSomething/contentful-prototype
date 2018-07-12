import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import NotFound from '../../NotFound';
import { Flex, FlexCell } from '../../Flex';
import ScrollConcierge from '../../ScrollConcierge';
import ContentfulEntry from '../../ContentfulEntry';
import Markdown from '../../utilities/Markdown/Markdown';
import { CallToActionContainer } from '../../CallToAction';
import { isCampaignClosed, parseContentfulType } from '../../../helpers';

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

  const renderBlock = json => {
    const type = parseContentfulType(json);

    let columnWidth = 'two-thirds';
    if (['photoSubmissionAction', 'gallery', 'imagesBlock'].includes(type)) {
      columnWidth = 'full';
    }

    // Only setting full column width for Content Blocks with an image
    if (type === 'contentBlock' && json.fields.image) {
      columnWidth = 'full';
    }

    return (
      <Flex id={`${json.id}`} key={json.id} className="margin-vertical">
        <FlexCell width={columnWidth}>
          <ContentfulEntry json={json} />
        </FlexCell>
      </Flex>
    );
  };

  const { content, sidebar, blocks } = subPage.fields;

  return (
    <div className="campaign-page" id={subPage.id}>
      <ScrollConcierge />
      {content ? (
        <div className="row">
          <div className="primary">
            <Markdown>{content}</Markdown>
          </div>
          <div className="secondary">
            {sidebar.map(block => (
              <div className="margin-bottom-lg" key={block.id}>
                <ContentfulEntry json={block} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className={`blocks clear-both`}>
        {blocks.map(block => renderBlock(block))}
      </div>

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
