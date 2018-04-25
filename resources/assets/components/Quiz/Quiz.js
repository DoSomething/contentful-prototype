import React from 'react';
import PropTypes from 'prop-types';
import { every, find } from 'lodash';

import calculateResult from './helpers';
import { Flex, FlexCell } from '../Flex';
import QuizQuestion from './QuizQuestion';
import Share from '../utilities/Share/Share';
import QuizConclusion from './QuizConclusion';
import ContentfulEntry from '../ContentfulEntry';

import './quiz.scss';

class Quiz extends React.Component {
  constructor() {
    super();

    this.state = {
      choices: {},
      results: {
        resultId: null,
        resultBlockId: null,
      },
    };

    this.selectChoice = this.selectChoice.bind(this);
  }

  evaluateQuiz() {
    const questions = this.props.questions;

    return every(questions, question => !!this.state.choices[question.id]);
  }

  completeQuiz() {
    if (this.evaluateQuiz()) {
      this.props.trackEvent('converted on quiz', {
        responses: this.state.choices,
      });

      const results = calculateResult(this.state.choices, this.props.questions);
      this.setState({ showResults: true, results });
    }
  }

  selectChoice(questionId, choiceId) {
    this.setState({
      choices: {
        ...this.state.choices,
        [questionId]: choiceId,
      },
    });
  }

  renderResult() {
    const { resultBlocks, results } = this.props;

    const resultBlockId = this.state.results.resultBlockId;
    const resultBlock = find(resultBlocks, { id: resultBlockId });

    const resultId = this.state.results.resultId;
    const result = find(results, { id: resultId });

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
  }

  render() {
    const { additionalContent, questions, title } = this.props;

    const { callToAction, introduction, submitButtonText } =
      additionalContent || {};

    const { choices, showResults } = this.state;

    return (
      <Flex className="quiz">
        <FlexCell width="two-thirds">
          <h1 className="quiz__heading">Quiz</h1>
          <h2 className="quiz__title">{title}</h2>

          {showResults ? null : introduction}

          {showResults
            ? null
            : questions.map(question => (
                <QuizQuestion
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  choices={question.choices}
                  selectChoice={this.selectChoice}
                  activeChoiceId={choices[question.id]}
                />
              ))}

          {showResults ? (
            this.renderResult()
          ) : (
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
        </FlexCell>
      </Flex>
    );
  }
}

Quiz.propTypes = {
  additionalContent: PropTypes.shape({
    callToAction: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string,
  }).isRequired,
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
  title: PropTypes.string.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  resultBlocks: null,
  submitButtonText: 'Get Results',
};

export default Quiz;
