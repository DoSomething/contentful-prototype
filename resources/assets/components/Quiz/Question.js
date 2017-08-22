import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import PhotoHeader from '../PhotoHeader';

const isActive = (answer, activeAnswer) => answer.id === activeAnswer;
const shouldHide = (answer, activeAnswer) => (
  activeAnswer !== null && ! isActive(answer, activeAnswer)
);

const Question = ({ title, id, quizId, answers, pickQuizAnswer, activeAnswer }) => (
  <div className="question">
    <PhotoHeader>
      <h2>{ title }</h2>
    </PhotoHeader>
    <div className="question__choices">
      {answers.map(answer => (
        <Answer
          {...answer}
          key={answer.id}
          pickQuizAnswer={pickQuizAnswer}
          questionId={id}
          quizId={quizId}
          isActive={isActive(answer, activeAnswer)}
          shouldHide={shouldHide(answer, activeAnswer)}
        />
      ))}
    </div>
  </div>
);

Question.propTypes = {
  id: PropTypes.string.isRequired,
  quizId: PropTypes.string.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  activeAnswer: PropTypes.string,
};

Question.defaultProps = {
  activeAnswer: null,
};

export default Question;
