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

const QuizWrapper = props => (
  <div className="main clearfix">
    <Enclosure className="default-container margin-top-xlg margin-bottom-lg">
      { props.notFound ? <NotFound /> : <Quiz {...props} /> }
    </Enclosure>
  </div>
);

QuizWrapper.propTypes = {
  notFound: PropTypes.bool,
};

QuizWrapper.defaultProps = {
  notFound: false,
};

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
    this.setState({
      choices: {
        ...this.state.choices,
        [questionId]: choiceId,
      },
    });
  }

  renderResult() {
    const resultBlockId = this.state.results.resultBlockId;
    const resultBlock = find(this.props.resultBlocks, { id: resultBlockId });

    const resultId = this.state.results.resultId;
    const result = find(this.props.results, { id: resultId });

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
    const { callToAction, introduction, questions, submitButtonText,
      title } = this.props;

    const { choices, showResults } = this.state;

    const quizQuestions = questions.map(question => (
      <QuizQuestion
        key={question.id}
        id={question.id}
        title={question.title}
        choices={question.choices}
        selectChoice={this.selectChoice}
        activeChoiceId={choices[question.id]}
      />
    ));

    const quizConclusion = showResults ? this.renderResult() : (
      <QuizConclusion callToAction={callToAction}>
        <button
          onClick={() => this.completeQuiz()}
          className="button quiz__submit"
          disabled={! this.completedQuiz()}
        >{submitButtonText || Quiz.defaultProps.submitButtonText}</button>
      </QuizConclusion>
    );

    return (
      <Flex className="quiz">
        <FlexCell width="two-thirds">
          <h1 className="quiz__heading">Quiz</h1>
          <h2 className="quiz__title">{ title }</h2>

          { showResults ? null : introduction }

          { showResults ? null : quizQuestions }

          { quizConclusion }
        </FlexCell>
      </Flex>
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
  submitButtonText: 'Get Results',
};

export { QuizWrapper, Quiz };
