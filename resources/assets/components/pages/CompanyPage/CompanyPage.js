import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
// import LazyImage from '../../utilities/LazyImage';
import PhotoBanner from '../../blocks/PhotoBanner/PhotoBanner';
import CtaPopover from '../../utilities/CtaPopover/CtaPopover';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { withoutNulls } from '../../../helpers';
import DelayedElement from '../../utilities/DelayedElement/DelayedElement';
import CallToActionBlock from '../../blocks/CallToActionBlock/CallToActionBlock';
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

      <main className="wrapper bg-white">
        <article className="bg-white overflow-hidden">
          {/* <PhotoBanner
            title={title}
            description={subTitle}
            hasButton={false}
            buttonLink="http://google.com"
          /> */}
          {/* {coverImage.url ? (
            <LazyImage
              className="w-full"
              alt={coverImage.description || 'Page Cover Image'}
              src={contentfulImageUrl(coverImage.url, 1440, 620)}
            />
          ) : null} */}

          <TextContent
            className="pt-4"
            classNameByEntry={{ GalleryBlock: 'base-12-grid' }}
          >
            {content}
          </TextContent>
        </article>

        <CallToActionBlock
          supertitle="Hello World"
          title="DoSomething Voter Registration"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisl non sapien consectetur venenatis. Donec nec finibus ante. In tellus erat, facilisis non ultrices nec, ornare sed neque. "
          template="voterReg"
          alignment="CENTER"
        />

        {slug === 'easy-scholarships' ? (
          <DismissableElement
            name="cta_popover_scholarship_email"
            context={{ contextSource: 'newsletter_scholarships' }}
            render={(handleClose, handleComplete) => (
              <DelayedElement delay={3}>
                <CtaPopover
                  title="Pays To Do Good"
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
