import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PageQuery from '../PageQuery';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

import './cause-page.scss';

export const CAUSE_PAGE_QUERY = gql`
  query CausePageQuery($slug: String!, $preview: Boolean!) {
    page: causePageBySlug(slug: $slug, preview: $preview) {
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

      <main role="main">
        <article className="cause-page">
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
            </div>

            {stats && statsBackgroundColor ? (
              <div className="grid-full md:flex">
                {stats.map((stat, index) => (
                  <div
                    key={stat.title}
                    className={classnames('stat rounded mt-3 p-3 md:w-1/3', {
                      'md:mr-5': index < stats.length - 1,
                    })}
                    style={{ backgroundColor: statsBackgroundColor }}
                  >
                    <p className="text-white text-lg font-bold uppercase">
                      {stat.title}
                    </p>

                    <p className="text-white text-5xl font-league-gothic -mt-3">
                      {stat.number.toLocaleString()}
                    </p>

                    <a
                      className="text-white hover:text-white font-normal underline cursor-pointer"
                      href={stat.link.url}
                    >
                      {stat.link.text}
                    </a>
                  </div>
                ))}
              </div>
            ) : null}
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

CausePageTemplate.propTypes = {
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
