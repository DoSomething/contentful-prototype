import React from 'react';
import PropTypes from 'prop-types';
import { every, find } from 'lodash';

import NotFound from '../NotFound';
import Enclosure from '../Enclosure';
import { Flex, FlexCell } from '../Flex';
import { ShareContainer } from '../Share';
import QuizQuestion from './QuizQuestion';
import QuizConclusion from './QuizConclusion';
import ContentfulEntry from '../ContentfulEntry';

import calculateResult from './helpers';

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
    const questions = this.props.additionalContent.questions;

    return every(questions, question => (
      !! this.state.choices[question.id]
    ));
  }

  completeQuiz() {
    if (this.evaluateQuiz()) {
      this.props.trackEvent('converted on quiz', {
        responses: this.state.choices,
      });

      const results = calculateResult(
        this.state.choices,
        this.props.additionalContent.questions,
      );
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
    const { results, resultBlocks } = this.props.additionalContent;

    const resultBlockId = this.state.results.resultBlockId;
    const resultBlock = find(resultBlocks, { id: resultBlockId });

    const resultId = this.state.results.resultId;
    const result = find(results, { id: resultId });

    if (! resultBlock) {
      // Return the result on it's own when no result block is found.
      return result ? (
        <QuizConclusion callToAction={result.content}>
          <ShareContainer className="quiz__share" parentSource="quiz" />
        </QuizConclusion>
      ) : null;
    }

    // Prepend the "quiz result" text to the specified block.
    resultBlock.fields.content = `${result.content}\n\n${resultBlock.fields.content}`;

    return <ContentfulEntry json={resultBlock} />;
  }

  render() {
    const { title, additionalContent } = this.props;

    const { callToAction, introduction, questions, submitButtonText } = (additionalContent || {});

    const { choices, showResults } = this.state;

    return (
      <div className="main clearfix">
        <Enclosure className="default-container margin-top-xlg margin-bottom-lg">
          { this.props.id ? (
            <Flex className="quiz">
              <FlexCell width="two-thirds">
                <h1 className="quiz__heading">Quiz</h1>
                <h2 className="quiz__title">{ title }</h2>

                { showResults ? null : introduction }

                { showResults ? null : (
                  questions.map(question => (
                    <QuizQuestion
                      key={question.id}
                      id={question.id}
                      title={question.title}
                      choices={question.choices}
                      selectChoice={this.selectChoice}
                      activeChoiceId={choices[question.id]}
                    />
                  ))
                )}

                { showResults ? this.renderResult() : (
                  <QuizConclusion callToAction={callToAction}>
                    <button
                      onClick={() => this.completeQuiz()}
                      className="button quiz__submit"
                      disabled={! this.evaluateQuiz()}
                    >{submitButtonText || 'Get Results'}</button>
                  </QuizConclusion>
                )}
              </FlexCell>
            </Flex>
          ) : <NotFound /> }
        </Enclosure>
      </div>
    );
  }
}

Quiz.propTypes = {
  additionalContent: PropTypes.shape({
    callToAction: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(PropTypes.object).isRequired,
    })).isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    resultBlocks: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitButtonText: PropTypes.string,
  }),
  id: PropTypes.string,
  title: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  additionalContent: null,
  id: null,
  title: null,
};


export default Quiz;
