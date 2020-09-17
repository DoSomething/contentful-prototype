import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import NotFound from '../../NotFound';
import { query } from '../../../helpers';
import ScrollConcierge from '../../ScrollConcierge';
import GotvBlock from '../../blocks/GotvBlock/GotvBlock';
import { CallToActionContainer } from '../../CallToAction';
import TextContent from '../../utilities/TextContent/TextContent';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const CampaignPageContent = props => {
  const { isCampaignClosed, match, pages, shouldShowAffirmation } = props;

  const subPage = find(pages, page =>
    page.type === 'page' ? page.fields.slug.endsWith(match.params.slug) : false,
  );

  if (!subPage) {
    return (
      <div className="base-12-grid">
        <NotFound className="col-span-4 md:col-span-8 lg:col-start-2" />
      </div>
    );
  }

  const { content, blocks } = subPage.fields;

  const gotvQuery = query('gotv-block');

  // Grid column span classes for styling our content.
  const narrowSpan = 'col-span-4 md:col-span-6 lg:col-start-2 lg:col-span-7';
  const wideSpan = 'col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-10';

  return (
    <div className="leading-normal text-base" id={subPage.id}>
      <ScrollConcierge trigger={!shouldShowAffirmation} />

      {content ? (
        <div className="base-12-grid py-3 md:py-6">
          <div className={narrowSpan}>
            <TextContent className="mx-3">{content}</TextContent>
          </div>
        </div>
      ) : null}

      {gotvQuery ? <GotvBlock /> : null}

      {blocks.length ? (
        <div className="base-12-grid clear-both py-3 md:py-6">
          {blocks.map(block => (
            <ContentfulEntryLoader
              key={block.id}
              id={block.id}
              className="mb-6 clear-both"
              classNameByEntryDefault={narrowSpan}
              classNameByEntry={{
                ActionStatsBlock: wideSpan,
                ContentBlock: wideSpan,
                GalleryBlock: wideSpan,
                ImagesBlock: wideSpan,
                PostGalleryBlock: wideSpan,
                PhotoSubmissionBlock: wideSpan,
                QuizBlock: wideSpan,
                SocialDriveBlock: wideSpan,
                VoterRegistrationDriveBlock: wideSpan,
                VoterRegistrationReferralsBlock: wideSpan,
              }}
            />
          ))}
        </div>
      ) : null}

      {isCampaignClosed ? null : (
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
  isCampaignClosed: PropTypes.bool.isRequired,
  match: ReactRouterPropTypes.match,
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
  shouldShowAffirmation: PropTypes.bool,
};

CampaignPageContent.defaultProps = {
  pages: [],
  match: {
    params: {},
  },
  shouldShowAffirmation: false,
};

export default CampaignPageContent;
