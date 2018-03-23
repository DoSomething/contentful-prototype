import React from 'react';
import { every } from 'lodash';
import PropTypes from 'prop-types';

import Enclosure from '../Enclosure';
import { Flex, FlexCell } from '../Flex';
import QuizQuestion from './QuizQuestion';
import QuizConclusion from './QuizConclusion';
import DashboardContainer from '../Dashboard/DashboardContainer';
import LedeBannerContainer from '../LedeBanner/LedeBannerContainer';
import TabbedNavigationContainer from '../Navigation/TabbedNavigationContainer';

import './quiz.scss';


class Quiz extends React.Component {
  constructor() {
    super();

    this.state = {
      choices: {},
    };

    this.selectChoice = this.selectChoice.bind(this);
    this.completedQuiz = this.completedQuiz.bind(this);
    this.completeQuiz = this.completeQuiz.bind(this);
  }

  selectChoice(questionId, choiceId) {
    const choices = Object.assign({}, this.state.choices);
    choices[questionId] = choiceId;
    this.setState({ choices });
  }

  completedQuiz() {
    return every(this.props.questions, question => (
      !! this.state.choices[question.id]
    ));
  }

  completeQuiz() {
    if (this.completedQuiz()) {
      this.props.trackEvent('converted on quiz', {
        responses: this.state.choices,
      });
      this.setState({ showResults: true });
    }
  }

  render() {
    const { callToAction, conclusionText, dashboard, introduction,
      questions, showLedeBanner, submitButtonText, title } = this.props;

    const showResults = this.state.showResults;

    const quizQuestions = questions.map(question => (
      <QuizQuestion
        key={question.id}
        id={question.id}
        title={question.title}
        choices={question.choices}
        selectChoice={this.selectChoice}
        activeChoiceId={this.state.choices[question.id]}
      />
    ));

    const quizConclusion = showResults ? <h1>{conclusionText}</h1> : (
      <QuizConclusion callToAction={callToAction}>
        <button
          onClick={() => this.completeQuiz()}
          className="button quiz__submit"
          disabled={! this.completedQuiz()}
        >{submitButtonText || 'Get Resultss'}</button>
      </QuizConclusion>
    );

    return (
      <div>

        { showLedeBanner ? <LedeBannerContainer /> : null }

        <div className="main clearfix">

          { dashboard && showLedeBanner ? <DashboardContainer /> : null }

          { showLedeBanner ? <TabbedNavigationContainer /> : null }

          <Enclosure className="default-container margin-top-xlg margin-bottom-lg">
            <Flex className="quiz">
              <FlexCell width="two-thirds">
                <h1 className="quiz__heading">Quiz</h1>
                <h2 className="quiz__title">{ title }</h2>

                { showResults ? null : introduction }

                { showResults ? null : quizQuestions }

                { quizConclusion }
              </FlexCell>
            </Flex>
          </Enclosure>
        </div>
      </div>
    );
  }
}

Quiz.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  callToAction: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object).isRequired,
  showLedeBanner: PropTypes.bool,
  })).isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  resultBlocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitButtonText: PropTypes.string,
  title: PropTypes.string.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  dashboard: null,
  submitButtonText: null,
};

export default Quiz;
