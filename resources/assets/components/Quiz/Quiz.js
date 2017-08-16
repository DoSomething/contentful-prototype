import React from 'react';
import PropTypes from 'prop-types';
import QuizInitializr from './QuizInitializr';
import Markdown from '../Markdown';
import Question from './Question';

const Quiz = ({ id, fields, data, compareQuizAnswer, pickQuizAnswer, quizInit }) => (
  <div className="quiz">
    <QuizInitializr quizId={id} quizInit={quizInit} />
    <h1 className="quiz__title">{fields.title}</h1>
<<<<<<< HEAD
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
=======
    <Markdown>{fields.introduction || ''}</Markdown>
    {(fields.questions || []).map(question => (
      <Question key={question.id} {...question} />
    ))}
    <Markdown>{fields.conclusion || ''}</Markdown>
>>>>>>> be05cd7ab22ede17b025785c6967cd9678dbc847
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
