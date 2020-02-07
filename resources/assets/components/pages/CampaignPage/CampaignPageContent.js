import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import NotFound from '../../NotFound';
import ScrollConcierge from '../../ScrollConcierge';
import { CallToActionContainer } from '../../CallToAction';
import TextContent from '../../utilities/TextContent/TextContent';
import { isCampaignClosed } from '../../../helpers';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const CampaignPageContent = props => {
  const { campaignEndDate, match, pages } = props;

  const subPage = find(pages, page =>
    page.type === 'page' ? page.fields.slug.endsWith(match.params.slug) : false,
  );

  if (!subPage) {
    return <NotFound />;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  const { content, sidebar, blocks } = subPage.fields;

  return (
    <div className="campaign-page__content" id={subPage.id}>
      <ScrollConcierge />
      {content ? (
        <div className="base-12-grid">
          <div className="grid-wide-7/10">
            <TextContent className="mx-3">{content}</TextContent>
          </div>
          {sidebar.length ? (
            <div className="grid-wide-3/10">
              {sidebar.map(block => (
                <div className="mb-6 mx-3" key={block.id}>
                  <ContentfulEntryLoader id={block.id} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="base-12-grid clear-both">
        {blocks.map(block => (
          <ContentfulEntryLoader
            key={block.id}
            id={block.id}
            className="mb-6 clear-both"
            classNameByEntryDefault="grid-wide-7/10"
            classNameByEntry={{
              ContentBlock: 'grid-wide',
              ImagesBlock: 'grid-wide',
              PostGalleryBlock: 'grid-wide',
              PhotoSubmissionBlock: 'grid-wide',
              SocialDriveBlock: 'grid-wide',
            }}
          />
        ))}
      </div>

      {isClosed ? null : (
        <CallToActionContainer
          className="text-xl"
          useCampaignTagline
          visualStyle="light"
          hideIfSignedUp
        />
      )}
    </div>
  );
};

CampaignPageContent.propTypes = {
  campaignEndDate: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }),
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
