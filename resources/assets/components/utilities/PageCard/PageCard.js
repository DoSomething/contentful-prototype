import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import { contentfulImageSrcset, contentfulImageUrl } from '../../../helpers';

export const pageCardFragment = gql`
  fragment PageCard on Page {
    id
    showcaseTitle
    showcaseDescription
    showcaseImage {
      url
    }
    slug
  }
`;

const PageCard = ({ page }) => {
  const { showcaseDescription, showcaseImage, showcaseTitle, slug } = page;

  const srcset = contentfulImageSrcset(showcaseImage.url, [
    { height: 205, width: 365 },
    { height: 410, width: 730 },
  ]);

  return (
    <article className="flex flex-col h-full text-left">
      <a href={`/us/${slug}`} className="block">
        <img
          alt={showcaseImage.description || `Cover photo for ${showcaseTitle}`}
          srcSet={srcset}
          src={contentfulImageUrl(showcaseImage.url, '365', '205', 'fill')}
        />
      </a>

      <div className="bg-white border-b-2 border-l-2 border-r-2 border-gray-300 border-solid flex-grow p-4 rounded-b">
        <h1 className="font-bold mb-2 text-base">
          <a
            className="text-blurple-500 hover:text-blurple-300"
            href={`/us/${slug}`}
          >
            {showcaseTitle}
          </a>
        </h1>

        <p className="font-normal">{showcaseDescription}</p>
      </div>
    </article>
  );
};

PageCard.propTypes = {
  page: propType(pageCardFragment).isRequired,
};

export default PageCard;
