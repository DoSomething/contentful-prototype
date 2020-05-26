import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useQuery } from 'react-apollo';

import triangle from './triangle.svg';
import ErrorPage from '../ErrorPage';
import NotFoundPage from '../NotFoundPage';
import Placeholder from '../../utilities/Placeholder';
import { isDevEnvironment, query } from '../../../helpers';
import { gqlVariables, placeholderContent } from './config';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { LinkBlockFragment } from '../../actions/LinkAction/LinkAction';
import ContentfulAsset from '../../utilities/ContentfulAsset/ContentfulAsset';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

const QUIZ_RESULT_PAGE_QUERY = gql`
  query QuizResultPageQuery($id: String!) {
    block(id: $id) {
      id
      ... on LinkBlock {
        ...LinkBlockFragment
      }
    }
  }

  ${LinkBlockFragment}
`;

const QuizResultPage = ({ id }) => {
  const { loading, error, data } = useQuery(QUIZ_RESULT_PAGE_QUERY, {
    variables: { id },
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!data.block) {
    return <NotFoundPage id={id} />;
  }

  const config = isDevEnvironment()
    ? gqlVariables.development
    : gqlVariables.production;
  const { linkBlockTitle } = data.block;
  const assetId = get(config, `results.${id}.assetId`, null);
  // Use placeholder for development until we're ready to enable Quiz Result Page feature.
  const content = query('preview') ? data.block.content : placeholderContent;

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article data-test="quiz-result-page">
          <header role="banner" className="bg-blurple-500">
            <div className="md:flex my-auto p-8">
              <div className="md:w-1/4 flex-grow md:flex-col bg-bottom ">
                {assetId ? (
                  <ContentfulAsset id={assetId} width={400} height={300} />
                ) : null}
              </div>
              <div className="md:w-3/4">
                <h1 className=" font-normal font-league-gothic color-white uppercase leading-10">
                  <span className="border-b-4 border-solid border-yellow-400 inline-block">
                    {linkBlockTitle}
                  </span>
                </h1>
                <div className="color-white">
                  <TextContent>{content}</TextContent>
                </div>
              </div>
            </div>
          </header>
          <div className="bg-white">
            <img className="m-auto" src={triangle} alt="triangle" />
          </div>
          <div className="bg-white py-3 md:py-6">
            <ContentfulEntryLoader
              id={config.galleryBlockId}
              className="grid-full"
            />
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

QuizResultPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default QuizResultPage;
