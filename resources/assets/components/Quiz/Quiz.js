import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { countBy, every, entries, head, last, maxBy, omit } from 'lodash';

import QuizQuestion from './QuizQuestion';
import QuizConclusion from './QuizConclusion';
import { trackAnalyticsEvent } from '../../helpers/analytics';

import './quiz.scss';

export const QuizBlockFragment = gql`
  fragment QuizBlockFragment on QuizBlock {
    title
    questions
    defaultResultBlock {
      id
    }
    autoSubmit
    hideQuestionNumber
    additionalContent
  }
`;

/**
 * Find the most common result for the user's choices.
 *
 * @param  {Object} choices
 * @param  {Array}  questions
 * @return {Object}
 */
export const calculateResult = (choices, questions) => {
  // We want to tally up the result blocks for each of the user's choices:
  const talliedResults = countBy(questions, question => {
    const selectedChoiceId = choices[question.id];
    const selectedChoice = question.choices[selectedChoiceId];

    return selectedChoice.resultBlock;
  });

  // If a choice doesn't have an explicit result, we just ignore it:
  const filteredTally = omit(talliedResults, '', null, undefined);

  // Finally, get the key with the largest tallied value:
  return head(maxBy(entries(filteredTally), last));
};

const Quiz = ({
  id,
  questions,
  title,
  hideQuestionNumber,
  defaultResultBlock,
  additionalContent,
  autoSubmit,
  onComplete,
}) => {
  const [choices, setChoices] = useState({});

  const { callToAction, introduction, submitButtonText } = additionalContent;
  const finishedQuiz = every(questions, question => !!choices[question.id]);

  const completeQuiz = () => {
    const resultBlockId = calculateResult(choices, questions);

    trackAnalyticsEvent({
      context: {
        id,
        campaignId: additionalContent.campaignId,
      },
      metadata: {
        category: 'campaign_action',
        noun: 'quiz',
        target: 'form',
        verb: 'submitted',
      },
    });

    onComplete(resultBlockId || defaultResultBlock.id);
  };

  const selectChoice = (questionId, choiceId) => {
    setChoices({ ...choices, [questionId]: choiceId });
  };

  // If this quiz automatically submits (often used for multi-step
  // quizzes), then check if we can complete it on each render:
  if (autoSubmit && finishedQuiz) {
    completeQuiz();
  }

  return (
    <div className="md:w-2/3">
      <h1 className="quiz__heading">Quiz</h1>
      {title ? <h2 className="quiz__title">{title}</h2> : null}

      {introduction}

      {questions.map(question => (
        <QuizQuestion
          key={question.id}
          id={question.id}
          title={question.title}
          choices={question.choices}
          selectChoice={selectChoice}
          hideQuestionNumber={hideQuestionNumber}
          activeChoiceId={choices[question.id]}
        />
      ))}

      {autoSubmit ? null : (
        <QuizConclusion callToAction={callToAction}>
          <button
            type="submit"
            className="button quiz__submit"
            onClick={completeQuiz}
            disabled={!finishedQuiz}
          >
            {submitButtonText || 'Get Results'}
          </button>
        </QuizConclusion>
      )}
    </div>
  );
};

Quiz.propTypes = {
  id: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
  autoSubmit: PropTypes.bool.isRequired,
  additionalContent: PropTypes.shape({
    campaignId: PropTypes.number,
    callToAction: PropTypes.string.isRequired,
    introduction: PropTypes.string,
    submitButtonText: PropTypes.string,
  }).isRequired,
  defaultResultBlock: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  hideQuestionNumber: PropTypes.bool,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
  ).isRequired,
  title: PropTypes.string,
};

Quiz.defaultProps = {
  defaultResultBlock: null,
  hideQuestionNumber: false,
  title: null,
};

export default Quiz;
