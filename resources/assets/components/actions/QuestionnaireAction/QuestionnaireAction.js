import { every } from 'lodash';
import React, { useState } from 'react';

import Card from '../../utilities/Card/Card';
import ActionInformation from '../ActionInformation';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';

const CHARACTER_LIMIT = 500;

const QUESTIONS = [
  {
    actionId: 1,
    label: 'Are you going to school in person?',
    placeholder: 'Neither',
  },
  {
    actionId: 2,
    label: "What's helping you cope?",
    placeholder: 'Herbs and grasses',
  },
];

const TITLE = 'Submit your tips';
const INFORMATION_TITLE = 'more info';
const INFORMATION_CONTENT = 'more information here.';
const BUTTON_TEXT = 'Submit Answers';

const QuestionnaireAction = () => {
  const [answers, updateAnswers] = useState({});

  const onChange = (questionId, updatedAnswer) => {
    updateAnswers({ ...answers, [questionId]: updatedAnswer });
  };

  const finishedQuestionnaire = every(
    QUESTIONS,
    question =>
      !!answers[question.actionId] &&
      answers[question.actionId].length < CHARACTER_LIMIT,
  );

  return (
    <div
      className="lg:grid grid-cols-12 gap-6"
      data-testid="questionnaire-action"
    >
      <Card className="bordered rounded col-span-8" title={TITLE}>
        <form className="p-3">
          {QUESTIONS.map((question, index) => {
            const questionId = `question-${question.actionId}`;

            return (
              <div key={question.actionId}>
                <label className="block mb-1 font-bold" htmlFor={questionId}>
                  {index + 1}. {question.label}
                </label>

                <textarea
                  className="block mb-1 h-24 text-field"
                  data-testid={questionId}
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
            text={BUTTON_TEXT}
            type="submit"
          />

          <PrivacyLanguage className="mt-5" />
        </form>
      </Card>

      <ActionInformation
        className="col-span-4 mt-6 lg:mt-0"
        title={INFORMATION_TITLE}
        content={INFORMATION_CONTENT}
      />
    </div>
  );
};

export default QuestionnaireAction;
