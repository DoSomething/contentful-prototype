import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';
import Share from '../Share';
import './quiz.scss';

const Quiz = ({ id, fields, data, completeQuiz, pickQuizAnswer }) => (
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
        activeAnswer={data.questions ? data.questions[question.id] : null}
        {...question}
      />
    ))}
    { data.error ? <p className="quiz__error">{data.error}</p> : null }
    { ! data.shouldSeeResult ? (
      <button
        onClick={() => completeQuiz(id)}
        className="button quiz__submit"
      >get my results</button>
    ) : null}
    { data.shouldSeeResult ? (
      <div>
        <Markdown className="padding-bottom-lg">{fields.conclusion}</Markdown>
        <Share
          className="quiz__share"
          parentSource="quiz"
        />
      </div>
    ) : null }
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
    comparison: PropTypes.string,
    questions: PropTypes.array,
  }).isRequired,
  data: PropTypes.shape({
    shouldSeeResult: PropTypes.bool,
    questions: PropTypes.object,
    error: PropTypes.string,
  }).isRequired,
  completeQuiz: PropTypes.func.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  data: {
    shouldSeeResult: false,
    questions: {},
    error: null,
  },
  fields: {
    introduction: '',
    questions: [],
    conclusion: '',
    comparison: '',
  },
};

export default Quiz;
