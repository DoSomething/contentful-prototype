import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';
import './quiz.scss';

const Quiz = ({ id, fields, data, viewQuizResult, pickQuizAnswer, compareQuizAnswer }) => (
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
        activeAnswer={data.questions[question.id]}
        {...question}
      />
    ))}
    { data.error ? <p className="quiz__error">{data.error}</p> : null }
    {data.shouldSeeResult ? null : (
      <button
        onClick={() => viewQuizResult(id)}
        className="button quiz__submit"
      >get my results</button>
    )}
    { data.shouldSeeResult ? <Markdown>{fields.conclusion}</Markdown> : null }
    { data.shouldSeeResult && ! data.shouldCompare ? (
      <button
        onClick={() => compareQuizAnswer(id)}
        className="button quiz__submit"
      >compare your results</button>
    ) : null }
    { data.shouldCompare ? <p>TODO, pretend its the comparison</p> : null }
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
  compareQuizAnswer: PropTypes.func.isRequired,
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

export default Quiz;
