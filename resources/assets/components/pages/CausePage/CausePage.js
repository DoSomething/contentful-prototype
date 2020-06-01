import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import FactCard from '../../utilities/FactCard/FactCard';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

import './cause-page.scss';

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
  // @TODO: Update this with image dimension logic to serve properly sized files to different screen sizes
  const backgroundImage = coverImage
    ? `url(${contentfulImageUrl(coverImage.url, '1440', '610', 'fill')})`
    : null;

  const styles = {
    backgroundImage,
  };

  const { stats, statsBackgroundColor } = additionalContent || {};

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article className="cause-page">
          <header
            role="banner"
            className="lede-banner base-12-grid py-3 md:py-6"
            style={withoutNulls(styles)}
          >
            <div className="title-lockup my-6">
              <h2 className="my-3 uppercase color-white text-lg">
                {superTitle}
              </h2>

              <h1 className="lede-banner__headline-title my-3 font-normal font-league-gothic color-white uppercase">
                {title}
              </h1>

              <TextContent styles={{ textColor: '#FFF', fontSize: '21px' }}>
                {description}
              </TextContent>
            </div>

            {stats && statsBackgroundColor ? (
              <div className="grid-full grid md:grid-cols-3 md:col-gap-5 row-gap-3">
                {stats.map(stat => (
                  <FactCard
                    key={stat.title}
                    backgroundColor={statsBackgroundColor}
                    title={stat.title}
                    number={stat.number}
                    link={stat.link}
                  />
                ))}
              </div>
            ) : null}
          </header>

          <div className="base-12-grid py-3 md:py-6">
            <PaginatedCampaignGallery
              className="grid-full"
              itemsPerRow={4}
              title="Campaigns"
              variables={{ isOpen: true, first: 12, causes: [slug] }}
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
  additionalContent: PropTypes.object,
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
