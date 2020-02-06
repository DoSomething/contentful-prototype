import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import LazyImage from '../../utilities/LazyImage';
import CtaPopover from '../../utilities/CtaPopover/CtaPopover';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import DelayedElement from '../../utilities/DelayedElement/DelayedElement';
import CtaPopoverEmailForm from '../../utilities/CtaPopover/CtaPopoverEmailForm';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import DismissableElement from '../../utilities/DismissableElement/DismissableElement';

export const COMPANY_PAGE_QUERY = gql`
  query CompanyPageQuery($slug: String!, $preview: Boolean!) {
    page: companyPageBySlug(slug: $slug, preview: $preview) {
      slug
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
  const { title, subTitle, slug, coverImage, content } = props;

  return (
    <>
      <SiteNavigationContainer />

      <main className="wrapper base-12-grid company-page">
        <article className="grid-wide card rounded border border-solid border-gray-300">
          {coverImage.url ? (
            <LazyImage
              className="w-full"
              alt={coverImage.description || 'Page Cover Image'}
              src={contentfulImageUrl(coverImage.url, 1440, 620)}
            />
          ) : null}
          <div className="m-4 md:m-12">
            <h1 className="font-league-gothic uppercase text-3xl md:text-5xl">
              {title}
            </h1>

            {subTitle ? <h2 className="text-lg my-3">{subTitle}</h2> : null}

            <TextContent className="pt-4">{content}</TextContent>
          </div>
        </article>

        {slug === 'easy-scholarships' ? (
          <DismissableElement
            name="cta_popover_scholarship_email"
            context={{ contextSource: 'newsletter_scholarships' }}
            render={(handleClose, handleComplete) => (
              <DelayedElement delay={3}>
                <CtaPopover
                  title="PAYS TO DO GOOD"
                  content="Want to earn easy scholarships for volunteering?
                Subscribe to DoSomething's monthly scholarship email."
                  handleClose={handleClose}
                >
                  <CtaPopoverEmailForm handleComplete={handleComplete} />
                </CtaPopover>
              </DelayedElement>
            )}
          />
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
};

CompanyPageTemplate.propTypes = {
  slug: PropTypes.string.isRequired,
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
