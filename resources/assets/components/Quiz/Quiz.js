import React from 'react';
import PropTypes from 'prop-types';
import { every, find, get } from 'lodash';

import { Flex, FlexCell } from '../Flex';
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
    };

    this.getResult = this.getResult.bind(this);
    this.completeQuiz = this.completeQuiz.bind(this);
    this.selectChoice = this.selectChoice.bind(this);
    this.completedQuiz = this.completedQuiz.bind(this);
  }

  getResult() {
    const resultId = get(this.state, 'results.resultId');
    const result = find(this.props.results, { id: resultId });

    const resultBlockId = get(this.state, 'results.resultBlockId');
    const resultBlock = find(this.props.resultBlocks, { id: resultBlockId });

    if (! (resultBlock && resultBlock.fields)) {
      return null;
    }

    resultBlock.fields.content = `${result.content}\n\n${resultBlock.fields.content}`;

    return <ContentfulEntry json={resultBlock} />;
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

      const results = calculateResult(this.state.choices, this.props.questions);
      this.setState({ showResults: true, results });
    }
  }

  selectChoice(questionId, choiceId) {
    const choices = Object.assign({}, this.state.choices);
    choices[questionId] = choiceId;
    this.setState({ choices });
  }

  render() {
    const { callToAction, introduction, questions, submitButtonText,
      title } = this.props;

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

    const quizConclusion = showResults ? this.getResult() : (
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
        <Flex className="quiz">
          <FlexCell width="two-thirds">
            <h1 className="quiz__heading">Quiz</h1>
            <h2 className="quiz__title">{ title }</h2>

            { showResults ? null : introduction }

            { showResults ? null : quizQuestions }

            { quizConclusion }
          </FlexCell>
        </Flex>
      </div>
    );
  }
}

Quiz.propTypes = {
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
  title: PropTypes.string.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  submitButtonText: null,
};

export default Quiz;
