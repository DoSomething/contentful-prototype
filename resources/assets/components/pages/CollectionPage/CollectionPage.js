import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

import './collection-page.scss';

export const COLLECTION_PAGE_QUERY = gql`
  query CollectionPageQuery($slug: String!, $preview: Boolean!) {
    page: collectionPageBySlug(slug: $slug, preview: $preview) {
      coverImage {
        url
        description
      }
      superTitle
      title
      description
      affiliatePrefix
      affiliates {
        title
        logo {
          url(w: 100, h: 100)
          description
        }
      }
      content
    }
  }
`;

const CollectionPageTemplate = ({
  coverImage,
  superTitle,
  title,
  description,
  affiliatePrefix,
  affiliates,
  content,
}) => {
  // @TODO: Update this with image dimension logic to serve properly sized files to different screen sizes
  const backgroundImage = coverImage
    ? `url(${contentfulImageUrl(coverImage.url, '1440', '610', 'fill')})`
    : null;

  const styles = {
    backgroundImage,
  };

  // We currently only support a single affiliate.
  const affiliate = affiliates[0];

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article className="collection-page">
          <header
            role="banner"
            className="lede-banner base-12-grid"
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

              {affiliate ? (
                <div className="mt-6">
                  <p className="font-bold font-size-base text-gray-500 uppercase">
                    {affiliatePrefix}
                  </p>

                  <img
                    className="mt-2 affiliate-logo"
                    src={affiliate.logo.url}
                    alt={affiliate.logo.description || affiliate.title}
                  />
                </div>
              ) : null}
            </div>
          </header>

          <TextContent
            className="base-12-grid"
            classNameByEntry={{
              GalleryBlock: 'grid-full',
              ContentBlock: 'grid-full-8/12',
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

CollectionPageTemplate.propTypes = {
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  superTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired,
  affiliatePrefix: PropTypes.string,
  affiliates: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.object.isRequired,
};

CollectionPageTemplate.defaultProps = {
  affiliatePrefix: 'In partnership with',
  affiliates: [],
};

const CollectionPage = ({ slug }) => (
  <PageQuery query={COLLECTION_PAGE_QUERY} variables={{ slug }}>
    {page => <CollectionPageTemplate {...withoutNulls(page)} />}
  </PageQuery>
);

CollectionPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CollectionPage;
