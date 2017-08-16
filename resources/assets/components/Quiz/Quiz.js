import React from 'react';
import PropTypes from 'prop-types';
import QuizInitializr from './QuizInitializr';
import Markdown from '../Markdown';
import Question from './Question';

const Quiz = ({ id, fields, data, compareQuizAnswer, pickQuizAnswer, quizInit }) => (
  <div className="quiz">
    <QuizInitializr quizId={id} quizInit={quizInit} />
    <h1 className="quiz__title">{fields.title}</h1>
    {data.shouldCompare ? null : (
      <Markdown>{fields.introduction || ''}</Markdown>
    )}
    {data.shouldCompare ? null : (fields.questions || []).map(question => (
      <Question
        key={question.id}
        pickQuizAnswer={pickQuizAnswer}
        quizId={id}
        {...question}
      />
    ))}
    { data.error ? <p className="quiz__error">{data.error}</p> : null }
    {data.shouldCompare ? null : (
      <button onClick={() => compareQuizAnswer(id)}>get my results</button>
    )}
    { data.shouldCompare ? <Markdown>{fields.conclusion || ''}</Markdown> : null }
  </div>
);

Quiz.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    json: PropTypes.object,
  }).isRequired,
  data: PropTypes.shape({
    shouldCompare: PropTypes.bool,
    questions: PropTypes.object,
    error: PropTypes.string,
  }).isRequired,
  compareQuizAnswer: PropTypes.func.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  quizInit: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  data: {
    shouldCompare: false,
    questions: {},
    error: null,
  },
};

export default Quiz;
