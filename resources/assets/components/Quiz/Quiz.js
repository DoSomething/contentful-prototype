import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';

const Quiz = ({ id, fields, data, viewQuizResult, pickQuizAnswer }) => (
  <div className="quiz">
    <h1 className="quiz__title">{fields.title}</h1>
    {data.shouldSeeResult ? null : (
      <Markdown>{fields.introduction}</Markdown>
    )}
    {data.shouldSeeResult ? null : (fields.questions).map(question => (
      <Question
        key={question.id}
        pickQuizAnswer={pickQuizAnswer}
        quizId={id}
        {...question}
      />
    ))}
    { data.error ? <p className="quiz__error">{data.error}</p> : null }
    {data.shouldSeeResult ? null : (
      <button onClick={() => viewQuizResult(id)}>get my results</button>
    )}
    { data.shouldSeeResult ? <Markdown>{fields.conclusion}</Markdown> : null }
  </div>
);

Quiz.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    questions: PropTypes.array,
  }).isRequired,
  data: PropTypes.shape({
    shouldCompare: PropTypes.bool,
    shouldSeeResult: PropTypes.bool,
    questions: PropTypes.object,
    error: PropTypes.string,
  }).isRequired,
  viewQuizResult: PropTypes.func.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  data: {
    shouldCompare: false,
    shouldSeeResult: false,
    questions: {},
    error: null,
  },
  fields: {
    introduction: '',
    questions: [],
    conclusion: '',
  },
};

class QuizLoader extends React.Component {
  componentDidMount() {
    this.props.startQuiz(this.props.id);
  }

  render() {
    return <Quiz {...this.props} />;
  }
}

QuizLoader.propTypes = {
  id: PropTypes.string.isRequired,
  startQuiz: PropTypes.func.isRequired,
};

export default QuizLoader;
