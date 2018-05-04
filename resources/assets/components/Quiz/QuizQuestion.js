import React from 'react';
import PropTypes from 'prop-types';

import QuizChoice from './QuizChoice';
import SectionHeader from '../SectionHeader';
import { convertNumberToWord } from '../../helpers';

const QuizQuestion = props => {
  const { activeChoiceId, choices, id, selectChoice, title } = props;

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

  return (
    <div className="question">
      <SectionHeader
        preTitle={`Question ${convertNumberToWord(Number(id) + 1)}`}
        title={title}
        hideStepNumber
      />
      <div className="question__choices">{quizChoices}</div>
    </div>
  );
};

QuizQuestion.propTypes = {
  activeChoiceId: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  selectChoice: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

QuizQuestion.defaultProps = {
  activeChoiceId: null,
};

export default QuizQuestion;
