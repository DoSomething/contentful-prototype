import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import { withoutNulls } from '../../../helpers';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import CuratedPageBanner from '../../utilities/CuratedPageBanner';
import TextContent from '../../utilities/TextContent/TextContent';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

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
      additionalContent
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
  additionalContent,
}) => {
  const { stats, statsBackgroundColor } = additionalContent || {};

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article className="collection-page">
          <CuratedPageBanner
            {...withoutNulls({
              coverImage,
              superTitle,
              title,
              description,
              affiliates,
              affiliatePrefix,
              stats,
              statsBackgroundColor,
            })}
          />

          <TextContent
            className="base-12-grid py-3 md:py-6"
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
  additionalContent: PropTypes.shape({
    stats: PropTypes.InstanceOf(Array),
    statsBackgroundColor: PropTypes.string,
  }),
};

CollectionPageTemplate.defaultProps = {
  affiliatePrefix: null,
  affiliates: null,
  additionalContent: {},
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
