/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { find, every } from 'lodash';
import ReactRouterPropTypes from 'react-router-prop-types';

import { query } from '../../helpers';
import { Flex, FlexCell } from '../Flex';
import QuizQuestion from './QuizQuestion';
import Share from '../utilities/Share/Share';
import QuizConclusion from './QuizConclusion';
import ContentfulEntry from '../ContentfulEntry';
import ScrollConcierge from '../ScrollConcierge';
import { calculateResult, resultParams, appendResultParams } from './helpers';

import './quiz.scss';

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    // Grab state overrides from the query parameters
    const resultId = query('resultId');
    const resultBlockId = query('resultBlockId');
    // Also ensuring user authentication before applying the showResults query param override
    const showResults = query('showResults') && props.isAuthenticated;

    // Scrub the result override parameter from the current URL
    const scrubbedParam = window.location.search.replace(
      resultParams(resultId, resultBlockId),
      '',
    );
    window.history.replaceState(window.location.state, '', scrubbedParam);

    const result = find(props.results, { id: resultId });
    const resultBlock = find(props.resultBlocks, { id: resultBlockId });

    this.state = {
      choices: {},
      results: {
        result,
        resultBlock,
      },
      showResults,
    };
  }

  componentDidUpdate() {
    if (!this.props.autoSubmit) {
      return;
    }

    if (!this.state.showResults && this.evaluateQuiz()) {
      setTimeout(this.completeQuiz, 300);
    }
  }

  evaluateQuiz = () => {
    const questions = this.props.questions;

    return every(questions, question => !!this.state.choices[question.id]);
  };

  completeQuiz = () => {
    // Ensure all quiz questions have been answered
    if (!this.evaluateQuiz()) {
      return;
    }

    const {
      trackEvent,
      questions,
      resultBlocks,
      autoSubmit,
      isAuthenticated,
      clickedSignUp,
      legacyCampaignId,
    } = this.props;

    const results = calculateResult(
      this.state.choices,
      questions,
      this.props.results,
      resultBlocks,
    );

    trackEvent('converted on quiz', {
      responses: this.state.choices,
    });

    // Run a quiz conversion (campaign signup) if this quiz is not set to auto submit
    if (!autoSubmit) {
      if (!isAuthenticated) {
        // Append result and resultBlock IDs to URL, so that upon redirect from login flow, we can show their results
        appendResultParams(results);

        clickedSignUp(legacyCampaignId, null, false);
        // Hard return so the results won't display before the login redirect
        return;
      }

      clickedSignUp(legacyCampaignId, null, false);
    }

    this.quizResultBlockHandler(results.resultBlock);

    this.setState({ showResults: true, results });
  };

  // If the winning resultBlock is a Quiz, navigates to the new resultBlock's slug
  quizResultBlockHandler = resultBlock => {
    if (resultBlock && resultBlock.type === 'quiz') {
      const { location, history, slug } = this.props;

      const resultBlockSlug = resultBlock.fields.slug;

      // Retain the current pathname while replacing the active quiz's slug with the resultBlocks slug
      const newPath = location.pathname.replace(
        new RegExp(`/quiz/${slug}$`),
        `/quiz/${resultBlockSlug}`,
      );

      history.push(newPath);
    }
  };

  selectChoice = (questionId, choiceId) => {
    this.setState({
      choices: {
        ...this.state.choices,
        [questionId]: choiceId,
      },
    });
  };

  renderQuiz = () => {
    const { questions, hideQuestionNumber } = this.props;

    const { callToAction, introduction, submitButtonText } =
      this.props.additionalContent || {};

    return (
      <React.Fragment>
        {introduction}

        {questions.map(question => (
          <QuizQuestion
            key={question.id}
            id={question.id}
            title={question.title}
            choices={question.choices}
            selectChoice={this.selectChoice}
            hideQuestionNumber={hideQuestionNumber}
            activeChoiceId={this.state.choices[question.id]}
          />
        ))}

        {this.props.autoSubmit ? null : (
          <QuizConclusion callToAction={callToAction}>
            <button
              onClick={() => this.completeQuiz()}
              className="button quiz__submit"
              disabled={!this.evaluateQuiz()}
            >
              {submitButtonText || Quiz.defaultProps.submitButtonText}
            </button>
          </QuizConclusion>
        )}
      </React.Fragment>
    );
  };

  renderResult = () => {
    const { result, resultBlock } = this.state.results;

    if (!resultBlock) {
      // Return the result on it's own when no result block is found.
      return result ? (
        <QuizConclusion callToAction={result.content}>
          <Share className="quiz__share" parentSource="quiz" />
        </QuizConclusion>
      ) : null;
    }

    if (result) {
      // Prepend the "quiz result" text to the specified block.
      resultBlock.fields.content = `${result.content}\n\n${
        resultBlock.fields.content
      }`;
    }

    return <ContentfulEntry json={resultBlock} />;
  };

  render() {
    return (
      <Flex className="quiz">
        <ScrollConcierge />

        <FlexCell width="two-thirds">
          <h1 className="quiz__heading">Quiz</h1>
          {this.props.title ? (
            <h2 className="quiz__title">{this.props.title}</h2>
          ) : null}

          {this.state.showResults ? this.renderResult() : this.renderQuiz()}
        </FlexCell>
      </Flex>
    );
  }
}

Quiz.propTypes = {
  autoSubmit: PropTypes.bool.isRequired,
  additionalContent: PropTypes.shape({
    callToAction: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string,
  }).isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
  ).isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
  resultBlocks: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string.isRequired,
  hideQuestionNumber: PropTypes.bool,
  title: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  resultBlocks: null,
  hideQuestionNumber: false,
  submitButtonText: 'Get Results',
  title: null,
};

export default Quiz;
