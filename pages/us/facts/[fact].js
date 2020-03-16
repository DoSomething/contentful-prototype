import React from 'react';
import tw from 'twin.macro';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../../../resources/assets/withApollo';
import LazyImage from '../../../resources/assets/components/utilities/LazyImage';
import GeneralPage from '../../../resources/assets/components/utilities/GeneralPage';
import ArticleHeader from '../../../resources/assets/components/utilities/ArticleHeader';
import StandardMarkdown from '../../../resources/assets/components/utilities/TextContent/StandardMarkdown';
import { css } from '@emotion/core';

const FactPageQuery = gql`
  query FactPageQuery($slug: String!) {
    page: pageBySlug(slug: $slug) {
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
`;

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

const FactPage = () => {
  const { query } = useRouter();

  const { data, loading, error } = useQuery(FactPageQuery, {
    variables: { slug: `facts/${query.fact}` },
  });

  if (loading) {
    return 'LOADING...';
  }

  if (error) {
    return 'ERR: KABLAM!';
  }

  if (!data.page) {
    return 'ERR: NOT FOUND';
  }

  const { title, subTitle, coverImage, content } = data.page;

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

export default withApollo({ ssr: true })(FactPage);
