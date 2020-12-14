import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import CuratedPageBanner from '../../utilities/CuratedPageBanner';
import TextContent from '../../utilities/TextContent/TextContent';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

export const CAUSE_PAGE_QUERY = gql`
  query CausePageQuery($slug: String!, $preview: Boolean!) {
    page: causePageBySlug(slug: $slug, preview: $preview) {
      slug
      coverImage {
        url
        description
      }
      superTitle
      title
      description
      content
      additionalContent
    }
  }
`;

const CausePageTemplate = ({
  slug,
  coverImage,
  superTitle,
  title,
  description,
  content,
  additionalContent,
}) => {
  const { stats, statsBackgroundColor } = additionalContent || {};

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article className="cause-page">
          <CuratedPageBanner
            coverImage={coverImage}
            superTitle={superTitle}
            title={title}
            description={description}
            stats={stats}
            statsBackgroundColor={statsBackgroundColor}
          />

          <div className="base-12-grid py-3 md:py-6">
            <PaginatedCampaignGallery
              className="grid-full"
              itemsPerRow={4}
              title="Campaigns"
              variables={{
                isOpen: true,
                first: 12,
                causes: [slug],
                orderBy: 'start_date,desc',
              }}
            />
          </div>

          <TextContent
            className="base-12-grid py-3 md:py-6"
            classNameByEntry={{
              GalleryBlock: 'grid-full',
              ContentBlock: 'grid-full',
            }}
            classNameByEntryDefault="grid-full-8/12"
          >
            {content}
          </TextContent>
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

CausePageTemplate.propTypes = {
  slug: PropTypes.string.isRequired,
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  superTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  additionalContent: PropTypes.shape({
    stats: PropTypes.arrayOf(PropTypes.object),
    statsBackgroundColor: PropTypes.string,
  }),
};

CausePageTemplate.defaultProps = {
  additionalContent: {},
};

const CausePage = ({ slug }) => (
  <PageQuery query={CAUSE_PAGE_QUERY} variables={{ slug }}>
    {page => <CausePageTemplate {...page} />}
  </PageQuery>
);

CausePage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CausePage;
