import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import { PhotoHeader } from '../PhotoHeader';

const isActive = (answer, activeAnswer) => answer.id === activeAnswer;
const shouldFade = (answer, activeAnswer) => (
  activeAnswer !== null && ! isActive(answer, activeAnswer)
);

const Question = (props) => {
  const {
    id, quizId, title, backgroundImage, answers,
    pickQuizAnswer, activeAnswer,
  } = props;

  return (
    <div className="question">
      <PhotoHeader backgroundImage={backgroundImage}>
        <h2 className="question__title">{ title }</h2>
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
            isFaded={shouldFade(answer, activeAnswer)}
          />
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  id: PropTypes.string.isRequired,
  quizId: PropTypes.string.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  answers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  activeAnswer: PropTypes.string,
};

Question.defaultProps = {
  activeAnswer: null,
  backgroundImage: null,
};

export default Question;
