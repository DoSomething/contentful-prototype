import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { every, get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { RestApiClient } from '@dosomething/gateway';

import { env } from '../../../helpers/env';
import Card from '../../utilities/Card/Card';
import { tabularLog } from '../../../helpers/api';
import ActionInformation from '../ActionInformation';
import { report } from '../../../helpers/monitoring';
import { formatPostPayload } from '../../../helpers/forms';
import { isAuthenticated, useGate } from '../../../helpers/auth';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CharacterLimit from '../../utilities/CharacterLimit/CharacterLimit';
import PrivacyLanguage from '../../utilities/PrivacyLanguage/PrivacyLanguage';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
  getPageContext,
} from '../../../helpers/analytics';

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

/**
 * Parse the question index from a validation error field name. ('questions.1.answer' -> 1).
 *
 * @param  {Object} errorField
 * @return {Number}
 */
const getQuestionIndex = errorField => Number(errorField.match(/[0-9]/)[0]);

/**
 * Format a question field's error message into something more human friendly.
 * ('The question.0.answer is required.' -> 'The question #1 answer is required.').
 *
 * @param  {Object} errorField
 * @param  {Object} errorMessage
 * @return {Number}
 */
const formatQuestionErrorMessage = (errorField, errorMessage) =>
  errorMessage.replace(
    /questions\.[0-9]\./,
    `question #${getQuestionIndex(errorField) + 1} `,
  );

const QuestionnaireAction = ({
  id,
  title,
  questions,
  buttonText,
  informationTitle,
  informationContent,
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [flash, authenticate] = useGate(`QuestionnaireAction:${id}`, {
    skip: loading,
  });

  const [answers, updateAnswers] = useState(flash.answers || {});

  const submitQuestionnaire = data => {
    const client = new RestApiClient(`${env('NORTHSTAR_URL')}`, {
      headers: {
        Authorization: `Bearer ${window.AUTH.token}`,
        'Content-Type': 'application/json',
      },
    });

    client
      .post('/api/v3/questionnaires', data)
      .then(response => {
        tabularLog(get(response, 'data', null));

        trackAnalyticsEvent('completed_questionnaire_action', {
          action: 'questionnaire_completed',
          category: EVENT_CATEGORIES.campaignAction,
          label: 'questionnaire',
          context: {
            blockId: id,
            ...getPageContext(),
          },
        });

        window.location = `/us/posts/${response.data[0].id}?submissionActionId=${id}`;
      })
      .catch(error => {
        report(error);

        trackAnalyticsEvent('failed_questionnaire_action', {
          action: 'questionnaire_failed',
          category: EVENT_CATEGORIES.campaignAction,
          label: 'questionnaire',
          context: {
            blockId: id,
            ...getPageContext(),
            error,
          },
        });

        setLoading(false);

        setErrors({
          errorMessage:
            get(error, 'response.error.message') ||
            get(error, 'response.message'),
          fieldErrors: get(error, 'response.errors'),
        });
      });
  };

  useEffect(() => {
    // If we're returning from the authentication flow with "flashed" data, submit the questionnaire.
    if (isAuthenticated() && flash.questionnaireData) {
      setLoading(true);
      submitQuestionnaire(flash.questionnaireData);
    }
  }, [flash]);

  const onChange = (questionId, updatedAnswer) => {
    updateAnswers({ ...answers, [questionId]: updatedAnswer });
  };

  const onSubmit = event => {
    event.preventDefault();

    setLoading(true);
    setErrors(null);

    trackAnalyticsEvent('submitted_questionnaire_action', {
      action: 'form_submitted',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'questionnaire',
      context: {
        blockId: id,
        ...getPageContext(),
      },
    });

    const data = formatPostPayload({
      questions: questions.map(question => ({
        title: question.title,
        answer: answers[question.actionId],
        action_id: question.actionId,
      })),
      contentful_id: id,
    });

    return isAuthenticated()
      ? submitQuestionnaire(data)
      : authenticate({ questionnaireData: data, answers });
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
        {errors ? (
          <p
            className="p-3 text-red-500 font-bold"
            data-testid="questionnaire-error-message"
          >
            {errors.fieldErrors
              ? 'Hmm, there were some issues with your submission.'
              : errors.errorMessage}
          </p>
        ) : null}

        {get(errors, 'fieldErrors') ? (
          <ul className="p-3 mt-0" data-testid="questionnaire-field-errors">
            {Object.keys(errors.fieldErrors).map(errorField => (
              <li key={errorField} className="text-red-500">
                {errors.fieldErrors[errorField].map(errorMessage =>
                  formatQuestionErrorMessage(errorField, errorMessage),
                )}
              </li>
            ))}
          </ul>
        ) : null}

        <form className="p-3" onSubmit={onSubmit}>
          {questions.map((question, index) => {
            const questionId = `question-${question.actionId}`;

            const hasError = Object.keys(get(errors, 'fieldErrors', {})).find(
              error =>
                error.startsWith('questions') &&
                getQuestionIndex(error) === index,
            );

            return (
              <div key={question.actionId} data-testid={questionId}>
                <label
                  data-testid={`${questionId}-title`}
                  className={classNames('block mb-1 font-bold', {
                    'text-red-500': hasError,
                  })}
                  htmlFor={questionId}
                >
                  {index + 1}. {question.title}
                </label>

                <textarea
                  className={classNames(
                    'block mb-1 h-24 w-full text-base p-3 bg-clip-padding border border-gray-400 rounded',
                    {
                      'shake border border-red-500': hasError,
                    },
                  )}
                  data-testid={`${questionId}-input`}
                  id={questionId}
                  name={questionId}
                  placeholder={question.placeholder}
                  onChange={event =>
                    onChange(question.actionId, event.target.value)
                  }
                  value={answers[question.actionId]}
                  disabled={loading}
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
            isLoading={loading}
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      placeholder: PropTypes.string,
      actionId: PropTypes.string,
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
