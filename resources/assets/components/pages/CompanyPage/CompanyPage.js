import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import LazyImage from '../../utilities/LazyImage';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

export const COMPANY_PAGE_QUERY = gql`
  query CollectionPageQuery($slug: String!, $preview: Boolean!) {
    page: companyPageBySlug(slug: $slug, preview: $preview) {
      coverImage {
        url
        description
      }
      title
      subTitle
      content
    }
  }
`;

const CompanyPageTemplate = props => {
  const { title, subTitle, coverImage, content } = props;

  return (
    <>
      <SiteNavigationContainer />

      <main className="wrapper base-12-grid">
        <article className="grid-wide card rounded border border-solid border-gray-300">
          {coverImage.url ? (
            <LazyImage
              className="w-full"
              alt={coverImage.description || 'Page Cover Image'}
              src={contentfulImageUrl(coverImage.url, 1440, 620)}
            />
          ) : null}
          <div className="m-4 md:m-12">
            <h1 className="font-league-gothic uppercase text-3xl md:text-4xl">
              {title}
            </h1>

            {subTitle ? <h2 className="text-lg my-3">{subTitle}</h2> : null}

            <TextContent className="pt-4">{content}</TextContent>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

CompanyPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  content: PropTypes.object,
};

CompanyPageTemplate.defaultProps = {
  coverImage: {},
  content: null,
  subTitle: null,
};

const CompanyPage = ({ slug }) => (
  <PageQuery query={COMPANY_PAGE_QUERY} variables={{ slug }}>
    {page => <CompanyPageTemplate {...withoutNulls(page)} />}
  </PageQuery>
);

CompanyPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CompanyPage;
