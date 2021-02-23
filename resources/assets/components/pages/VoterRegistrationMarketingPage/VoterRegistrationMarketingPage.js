import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import StartVoterRegistrationForm from '../../utilities/StartVoterRegistrationForm/StartVoterRegistrationForm';
import {
  contentfulImageUrl,
  contentfulImageSrcset,
} from '../../../helpers/contentful';
import SectionBlock, {
  SectionBlockFragment,
} from '../../blocks/SectionBlock/SectionBlock';

export const VOTER_REGISTRATION_MARKETING_PAGE_QUERY = gql`
  query VoterRegistrationMarketingPageQuery(
    $slug: String!
    $preview: Boolean!
  ) {
    page: voterRegistrationMarketingPageBySlug(slug: $slug, preview: $preview) {
      slug
      coverImage {
        url
        description
      }
      logo {
        url
        description
      }
      title
      titleColor
      subTitle
      subTitleColor
      voterRegistrationFormButtonText
      voterRegistrationFormButtonColor
      content {
        ...SectionBlockFragment
      }
      source
      sourceDetails
    }
  }

  ${SectionBlockFragment}
`;

const VoterRegistrationMarketingPageTemplate = ({
  title,
  titleColor,
  subTitle,
  subTitleColor,
  coverImage,
  voterRegistrationFormButtonText,
  voterRegistrationFormButtonColor,
  logo,
  source,
  sourceDetails,
  content,
}) => {
  const srcset = contentfulImageSrcset(coverImage.url, [
    { height: 250, width: 250 },
    { height: 250, width: 800 },
    { height: 450, width: 1400 },
  ]);

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article>
          <img
            data-testid="vr-marketing-page-banner-image"
            srcSet={srcset}
            src={contentfulImageUrl(coverImage.url, '1400', '450', 'fill')}
            alt={coverImage.description || ''}
          />

          <div
            data-testid="vr-marketing-page-banner-main"
            style={{ backgroundColor: '#309450' }}
            className="p-4"
          >
            <img
              data-testid="vr-marketing-page-banner-logo"
              className="m-auto"
              src={contentfulImageUrl(logo.url, '250', '60')}
              alt={logo.description || ''}
            />

            <h1
              data-testid="vr-marketing-page-banner-title"
              className="md:leading-none text-white text-center uppercase font-league-gothic font-normal text-5xl md:text-6xl"
              style={{ color: titleColor }}
            >
              {title}
            </h1>

            <h2
              data-testid="vr-marketing-page-banner-subtitle"
              className="text-white text-center text-lg"
              style={{ color: subTitleColor }}
            >
              {subTitle}
            </h2>

            <StartVoterRegistrationForm
              className="max-w-lg m-auto"
              contextSource="voter-registration-marketing-page"
              buttonText={voterRegistrationFormButtonText}
              buttonColor={voterRegistrationFormButtonColor}
              source={source}
              sourceDetails={sourceDetails}
            />
          </div>

          <SocialShareTray
            className="text-center"
            // Pass through the current URL without the query parameters.
            shareLink={`${window.location.origin}${window.location.pathname}`}
            platforms={['facebook', 'twitter']}
          />

          <SectionBlock
            {...content}
            classNameByEntryDefault="grid-narrow"
            customProps={{ ContentBlock: { fullWidth: true } }}
          />
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

VoterRegistrationMarketingPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  subTitle: PropTypes.string.isRequired,
  subTitleColor: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  content: PropTypes.object.isRequired,
  voterRegistrationFormButtonText: PropTypes.string,
  voterRegistrationFormButtonColor: PropTypes.string,
  logo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  source: PropTypes.string,
  sourceDetails: PropTypes.string,
};

VoterRegistrationMarketingPageTemplate.defaultProps = {
  titleColor: null,
  subTitleColor: null,
  voterRegistrationFormButtonText: null,
  voterRegistrationFormButtonColor: null,
  logo: {},
  source: 'web',
  sourceDetails: 'voter_registration_marketing_page',
};

const VoterRegistrationMarketingPage = ({ slug }) => (
  <PageQuery
    query={VOTER_REGISTRATION_MARKETING_PAGE_QUERY}
    variables={{ slug }}
  >
    {page => <VoterRegistrationMarketingPageTemplate {...page} />}
  </PageQuery>
);

VoterRegistrationMarketingPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default VoterRegistrationMarketingPage;
