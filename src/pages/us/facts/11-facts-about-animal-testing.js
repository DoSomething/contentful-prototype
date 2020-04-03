import React from 'react';
import tw from 'twin.macro';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';

import LazyImage from '../../../../resources/assets/components/utilities/LazyImage';
import GeneralPage from '../../../../resources/assets/components/utilities/GeneralPage';
import ArticleHeader from '../../../../resources/assets/components/utilities/ArticleHeader';
import StandardMarkdown from '../../../../resources/assets/components/utilities/TextContent/StandardMarkdown';

const markdownStyles = css`
  ${tw`mt-3`}

  ol {
    ${tw`list-decimal`}
  }

  li {
    ${tw`mb-3`}
  }

  hr {
    ${tw`h-1 mx-auto my-12 w-1/3`}
    background-color: #4e2b63;
    border: none;
  }

  .footnotes {
    ${tw`text-gray-500`}
  }
`;

export const query = graphql`
  query {
    dosomething {
      page: pageBySlug(slug: "facts/11-facts-about-animal-testing") {
        id
        title
        subTitle
        authors {
          id
        }
        coverImage {
          description
          url(w: 1440, h: 620)
        }
        content
      }
    }
  }
`;

const FactPage = ({ data }) => {
  if (!data.dosomething.page) {
    return 'ERR: NOT FOUND';
  }

  const { title, subTitle, coverImage, content } = data.dosomething.page;

  return (
    <GeneralPage>
      <ArticleHeader title={title} subtitle={subTitle} />
      {coverImage ? (
        <LazyImage
          className="py-3 mx-auto"
          alt={coverImage.description || 'Page Cover Image'}
          src={coverImage.url}
        />
      ) : null}
      <StandardMarkdown css={markdownStyles}>{content}</StandardMarkdown>
    </GeneralPage>
  );
};

export default FactPage;
