import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';

import ErrorPage from '../ErrorPage';
import triangle from './triangle.svg';
import { gqlVariables } from './config';
import NotFoundPage from '../NotFoundPage';
import { isDevEnvironment } from '../../../helpers';
import Placeholder from '../../utilities/Placeholder';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { LinkBlockFragment } from '../../actions/LinkAction/LinkAction';
import ContentfulAsset from '../../utilities/ContentfulAsset/ContentfulAsset';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';
import StartVoterRegistrationForm from '../../utilities/StartVoterRegistrationForm/StartVoterRegistrationForm';

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
  const sourceDetail = get(config, `results.${id}.sourceDetail`, null);
  // Use placeholder for development until we're ready to enable Quiz Result Page feature.
  const content = data.block.content;

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article data-testid="quiz-result-page">
          <header role="banner" className="bg-blurple-500">
            <div className="md:flex my-auto p-8">
              <div className="md:w-1/4 flex-grow md:flex-col bg-bottom ">
                {assetId ? <ContentfulAsset id={assetId} width={375} /> : null}
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
          <div className="bg-white base-12-grid py-3 md:py-6">
            <ContentfulEntryLoader
              id={config.galleryBlockId}
              className="grid-full"
            />
            {sourceDetail ? (
              <div className="grid-full grid-main py-3 md:py-6">
                <h1 className="mx-auto text-center mb-3">
                  <span className="font-normal font-league-gothic uppercase text-4xl pb-3">
                    What&rsquo;s Next? Register to Vote
                  </span>
                </h1>

                <p className="mb-3 text-lg text-center">
                  Paying attention to how our government is handling the
                  COVID-19 outbreak? Your vote is your way of making an impact
                  on the decisions our government makes.
                </p>
                <p className="mb-6 text-lg text-center">
                  Take 2 minutes and register online now with your state.
                </p>
                <StartVoterRegistrationForm
                  contextSource="voter-registration-quiz-results-page"
                  className="md:mx-auto xl:w-4/5"
                  sourceDetail={sourceDetail}
                />
              </div>
            ) : null}
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
