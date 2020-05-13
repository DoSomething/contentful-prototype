import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';

import ErrorPage from '../ErrorPage';
import NotFoundPage from '../NotFoundPage';
import Placeholder from '../../utilities/Placeholder';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { LinkBlockFragment } from '../../actions/LinkAction/LinkAction';
import { ShareBlockFragment } from '../../actions/ShareAction/ShareAction';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const QUIZ_RESULT_PAGE_QUERY = gql`
  query QuizResultPageQuery($id: String!) {
    block(id: $id) {
      id
      ... on LinkBlock {
        ...LinkBlockFragment
      }
      ... on ShareBlock {
        ...ShareBlockFragment
      }
    }
  }

  ${LinkBlockFragment}
  ${ShareBlockFragment}
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

  const { title, content } = data.block;

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article className="quiz-result-page">
          <header
            role="banner"
            className="base-12-grid py-3 md:py-6 bg-blurple-500"
          >
            <div className="my-6 grid-full">
              <h1 className="my-3 font-normal font-league-gothic color-white uppercase">
                {title}
              </h1>
            </div>
          </header>
          <div className="bg-white base-12-grid py-3 md:py-6">
            <TextContent className="grid-full">{content}</TextContent>
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
