import React from 'react';
import PropTypes from 'prop-types';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const QuizResultPage = () => {
  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article className="quiz-result-page">
          <header
            role="banner"
            className="base-12-grid py-3 md:py-6 bg-blurple-500"
          >
            <div className="my-6">
              <h2 className="my-3 uppercase color-white text-lg">Subtitle</h2>

              <h1 className="my-3 font-normal font-league-gothic color-white uppercase">
                Title
              </h1>

              <TextContent className="text-white">Description</TextContent>
            </div>
          </header>

          <TextContent className="base-12-grid py-3 md:py-6">Hello</TextContent>
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

QuizResultPage.propTypes = {
  id: PropTypes.string,
};

QuizResultPage.propTypes = {
  id: null,
};

export default QuizResultPage;
