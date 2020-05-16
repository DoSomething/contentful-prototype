import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';

import ErrorPage from '../ErrorPage';
import { gqlVariables, placeholderContent } from './config';
import NotFoundPage from '../NotFoundPage';
import Placeholder from '../../utilities/Placeholder';
import { isDevEnvironment, query } from '../../../helpers';
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
          <header
            role="banner"
            className="base-12-grid py-3 md:py-6 bg-blurple-500"
          >
            <div className="my-6 grid-full">
              <h1 className="my-3 font-normal font-league-gothic color-white uppercase">
                {linkBlockTitle}
              </h1>
              {assetId ? (
                <ContentfulAsset id={assetId} width={400} height={300} />
              ) : null}
            </div>
          </header>
          <div
            data-test="quiz-result-page-content"
            className="bg-white base-12-grid py-3 md:py-6"
          >
            <TextContent className="grid-full">{content}</TextContent>
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