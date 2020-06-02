import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import StatCard, { STAT_PROPS } from './StatCard/StatCard';
import TextContent from './TextContent/TextContent';
import { contentfulImageUrl, tailwind } from '../../helpers';

const CuratedPageBanner = ({
  coverImage,
  superTitle,
  title,
  description,
  affiliatePrefix,
  affiliates,
  stats,
  statsBackgroundColor,
}) => {
  // @TODO: Update this with image dimension logic to serve properly sized files to different screen sizes
  const backgroundImage = coverImage
    ? `url(${contentfulImageUrl(coverImage.url, '1440', '610', 'fill')})`
    : null;

  // We currently only support a single affiliate.
  const affiliate = affiliates && affiliates[0];

  return (
    <header
      role="banner"
      className="base-12-grid bg-center bg-no-repeat bg-cover py-3 md:py-6"
      style={{ backgroundImage }}
    >
      <div className="col-span-4 md:col-span-8 lg:col-span-7 my-6">
        <h2 className="my-3 uppercase color-white text-lg">{superTitle}</h2>

        <h1
          className="leading-none my-3 font-normal font-league-gothic color-white uppercase"
          css={css`
            font-size: 96px;

            @media (min-width: ${tailwind('screens.md')}) {
              font-size: 107px;
            }
          `}
        >
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
              className="mt-2"
              style={{ maxHeight: '50px' }}
              src={affiliate.logo.url}
              alt={affiliate.logo.description || affiliate.title}
            />
          </div>
        ) : null}
      </div>

      {stats && statsBackgroundColor ? (
        <div
          className="grid-full grid md:grid-cols-3 md:col-gap-5 row-gap-3"
          data-testid="curated-page-banner-stats"
        >
          {stats.map(stat => (
            <StatCard
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
  );
};

CuratedPageBanner.propTypes = {
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  superTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired,
  affiliatePrefix: PropTypes.string,
  affiliates: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      logo: PropTypes.shape({
        url: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }),
  ),
  stats: PropTypes.arrayOf(PropTypes.shape(STAT_PROPS)),
  statsBackgroundColor: PropTypes.string,
};

CuratedPageBanner.defaultProps = {
  affiliatePrefix: 'In partnership with',
  affiliates: [],
  stats: [],
  statsBackgroundColor: null,
};

export default CuratedPageBanner;
