import React from 'react';
import tw from 'twin.macro';
import gql from 'graphql-tag';
import { css } from '@emotion/core';

import createApolloClient from '../../../resources/assets/graphql';
import LazyImage from '../../../resources/assets/components/utilities/LazyImage';
import GeneralPage from '../../../resources/assets/components/utilities/GeneralPage';
import ArticleHeader from '../../../resources/assets/components/utilities/ArticleHeader';
import StandardMarkdown from '../../../resources/assets/components/utilities/TextContent/StandardMarkdown';

const FACT_PAGE_QUERY = gql`
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

const FactPage = ({ page }) => {
  if (!page) {
    return 'ERR: NOT FOUND';
  }

  const { title, subTitle, coverImage, content } = page;

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

export async function getStaticProps({ params }) {
  const GRAPHQL_URL = 'https://graphql-qa.dosomething.org/graphql';
  const graphql = createApolloClient(GRAPHQL_URL);

  const { data } = await graphql.query({
    query: FACT_PAGE_QUERY,
    variables: { slug: `facts/${params.fact}` },
  });

  return { props: data };
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { fact: '11-facts-about-animal-testing' } },
      { params: { fact: '11-facts-about-volcanoes' } },
    ],
    fallback: true,
  };
}

export default FactPage;
