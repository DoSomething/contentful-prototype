import gql from 'graphql-tag';
import { every } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Card from '../../utilities/Card/Card';
import ActionInformation from '../ActionInformation';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';

export const QuestionnaireBlockFragment = gql`
  fragment QuestionnaireBlockFragment on QuestionnaireBlock {
    title
    questions
    buttonText
    informationTitle
    informationContent
  }
`;

const CHARACTER_LIMIT = 500;

const QuestionnaireAction = ({
  title,
  questions,
  buttonText,
  informationTitle,
  informationContent,
}) => {
  const [answers, updateAnswers] = useState({});

  const onChange = (questionId, updatedAnswer) => {
    updateAnswers({ ...answers, [questionId]: updatedAnswer });
  };

  const finishedQuestionnaire = every(
    questions,
    question =>
      !!answers[question.actionId] &&
      answers[question.actionId].length < CHARACTER_LIMIT,
  );

  return (
    <div
      className="lg:grid grid-cols-12 gap-6"
      data-testid="questionnaire-action"
    >
      <Card className="bordered rounded col-span-8" title={title}>
        <form className="p-3">
          {questions.map((question, index) => {
            const questionId = `question-${question.actionId}`;

            return (
              <div key={question.actionId} data-testid={questionId}>
                <label
                  data-testid={`${questionId}-title`}
                  className="block mb-1 font-bold"
                  htmlFor={questionId}
                >
                  {index + 1}. {question.title}
                </label>

                <textarea
                  className="block mb-1 h-24 text-field"
                  data-testid={`${questionId}-input`}
                  id={questionId}
                  name={questionId}
                  placeholder={question.placeholder}
                  onChange={event =>
                    onChange(question.actionId, event.target.value)
                  }
                  value={answers[question.actionId]}
                />

                <CharacterLimit
                  className="mb-3"
                  limit={CHARACTER_LIMIT}
                  text={answers[question.actionId] || ''}
                />
              </div>
            );
          })}

          <PrimaryButton
            className="block mt-3 text-lg w-full"
            attributes={{ 'data-testid': 'questionnaire-submit-button' }}
            isDisabled={!finishedQuestionnaire}
            text={buttonText}
            type="submit"
          />

          <PrivacyLanguage className="mt-5" />
        </form>
      </Card>

      {informationContent ? (
        <ActionInformation
          className="col-span-4 mt-6 lg:mt-0"
          title={informationTitle}
          content={informationContent}
        />
      ) : null}
    </div>
  );
};

QuestionnaireAction.propTypes = {
  title: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      placeholder: PropTypes.string,
      actionId: PropTypes.number,
    }),
  ).isRequired,
  buttonText: PropTypes.string,
  informationTitle: PropTypes.string,
  informationContent: PropTypes.string,
};

QuestionnaireAction.defaultProps = {
  title: 'Questionnaire',
  buttonText: 'Submit Answers',
  informationTitle: 'More Info',
  informationContent: null,
};

export default QuestionnaireAction;
