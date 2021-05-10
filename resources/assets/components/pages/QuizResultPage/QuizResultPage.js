import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';

import ErrorPage from '../ErrorPage';
import triangle from './triangle.svg';
import gqlVariables from './config';
import NotFoundPage from '../NotFoundPage';
import Card from '../../utilities/Card/Card';
import Placeholder from '../../utilities/Placeholder';
import { isDevEnvironment } from '../../../helpers/env';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigation from '../../SiteNavigation/SiteNavigation';
import TextContent from '../../utilities/TextContent/TextContent';
import { LinkBlockFragment } from '../../actions/LinkAction/LinkAction';
import ContentfulAsset from '../../utilities/ContentfulAsset/ContentfulAsset';
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

  const { galleryBlockId } = isDevEnvironment()
    ? gqlVariables.development
    : gqlVariables.production;

  const {
    additionalContent,
    affiliateLogo,
    content,
    linkBlockTitle,
  } = data.block;

  return (
    <>
      <SiteNavigation />

      <main>
        <article data-testid="quiz-result-page">
          <header role="banner" className="base-12-grid bg-blurple-500 py-3">
            <div className="col-span-4 lg:col-span-3 bg-bottom lg:col-start-2">
              {affiliateLogo ? (
                <ContentfulAsset id={affiliateLogo.id} width={375} />
              ) : null}
            </div>
            <div className="col-span-4 lg:col-span-7 lg:my-auto">
              <h1 className="font-normal font-league-gothic color-white uppercase">
                <span className="border-b-4 border-solid border-yellow-400 inline-block text-4xl">
                  {linkBlockTitle}
                </span>
              </h1>
              <div className="color-white">
                <TextContent>{content}</TextContent>
              </div>
            </div>
          </header>
          <div className="bg-white">
            <img className="m-auto" src={triangle} alt="triangle" />
          </div>
          <div className="bg-white base-12-grid py-3 md:py-6">
            {additionalContent && additionalContent.sourceDetails ? (
              <div
                className="grid-full grid-main py-3 md:py-6 mb-10"
                data-testid="quiz-result-page-registration-section"
              >
                <h1 className="mx-auto text-center mb-3">
                  <span className="font-normal font-league-gothic uppercase text-4xl pb-3">
                    What&rsquo;s Next? Register to Vote
                  </span>
                </h1>

                <p className="mb-3 text-lg text-center">
                  75% of young people say that the most important thing we can
                  do to fight for racial justice is vote. Your vote is your way
                  of making an impact on the decisions our government makes.
                </p>
                <p className="mb-6 text-lg text-center">
                  Take 2 minutes and register online now with your state.
                </p>
                <Card
                  title="Register to Vote"
                  className="pb-3 md:mx-auto xl:w-4/5 bg-gray-100 border-none rounded"
                >
                  <StartVoterRegistrationForm
                    className="mx-auto xl:w-4/5"
                    contextSource="voter-registration-quiz-results-page"
                    sourceDetails={additionalContent.sourceDetails}
                  />
                </Card>
              </div>
            ) : null}

            <ContentfulEntryLoader id={galleryBlockId} className="grid-full" />
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
