import React from 'react';
import PropTypes from 'prop-types';

import QuizChoice from './QuizChoice';
import { convertNumberToWord } from '../../helpers';
import SectionHeader from '../utilities/SectionHeader/SectionHeader';

const QuizQuestion = props => {
  const {
    activeChoiceId,
    choices,
    hideQuestionNumber,
    id,
    selectChoice,
    title,
  } = props;

  const quizChoices = choices.map(choice => (
    <QuizChoice
      {...choice}
      isActive={activeChoiceId === choice.id}
      isFaded={activeChoiceId && activeChoiceId !== choice.id}
      key={choice.id}
      questionId={id}
      selectChoice={selectChoice}
    />
  ));

  const superTitle = hideQuestionNumber
    ? null
    : `Question ${convertNumberToWord(Number(id) + 1)}`;

  return (
    <div className="question">
      <SectionHeader superTitle={superTitle} title={title} />
      <div className="question__choices">{quizChoices}</div>
    </div>
  );
};

QuizQuestion.propTypes = {
  activeChoiceId: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  selectChoice: PropTypes.func.isRequired,
  hideQuestionNumber: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

QuizQuestion.defaultProps = {
  activeChoiceId: null,
  hideQuestionNumber: false,
};

export default QuizQuestion;
