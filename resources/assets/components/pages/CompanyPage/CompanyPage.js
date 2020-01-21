import React from 'react';
import PropTypes from 'prop-types';

import LazyImage from '../../utilities/LazyImage';
import { contentfulImageUrl } from '../../../helpers';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const CompanyPage = props => {
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

CompanyPage.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  content: PropTypes.object,
};

CompanyPage.defaultProps = {
  coverImage: {},
  content: null,
  subTitle: null,
};

export default CompanyPage;
