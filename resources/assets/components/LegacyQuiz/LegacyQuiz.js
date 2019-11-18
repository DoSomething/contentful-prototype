import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import Question from './Question';
import Conclusion from './Conclusion';
import Share from '../utilities/Share/Share';
import ContentfulEntry from '../ContentfulEntry';
import { trackAnalyticsEvent } from '../../helpers/analytics';
import TextContent from '../utilities/TextContent/TextContent';

import './legacy-quiz.scss';

const LegacyQuiz = props => {
  const {
    campaignId,
    completeQuiz,
    data,
    fields,
    id,
    pageId,
    pickQuizAnswer,
    submitButtonText,
  } = props;
  const { error, shouldSeeResult, selectedResult } = data;

  const introduction = shouldSeeResult ? null : (
    <TextContent className="quiz__description">
      {fields.introduction}
    </TextContent>
  );

  const questions = shouldSeeResult
    ? null
    : fields.questions.map(question => (
        <Question
          key={question.id}
          pickQuizAnswer={pickQuizAnswer}
          quizId={id}
          activeAnswer={data.questions ? data.questions[question.id] : null}
          {...question}
        />
      ));

  const quizError = error ? <p className="quiz__error">{data.error}</p> : null;

  const submitConclusion = shouldSeeResult ? null : (
    <Conclusion callToAction={fields.callToAction}>
      <button
        type="submit"
        className="button quiz__submit"
        onClick={() => completeQuiz(id)}
      >
        {submitButtonText || LegacyQuiz.defaultProps.submitButtonText}
      </button>
    </Conclusion>
  );

  const shareConclusion = shouldSeeResult ? (
    <Conclusion callToAction={fields.conclusion}>
      <Share className="quiz__share" parentSource="quiz" />
    </Conclusion>
  ) : null;

  const showResultingAction = () => {
    const action = find(fields.results, { id: selectedResult });
    if (action) {
      action.fields.content = `${fields.conclusion}\n${action.fields.content}`;
    }

    return <ContentfulEntry json={action} />;
  };

  if (shouldSeeResult) {
    trackAnalyticsEvent({
      context: { campaignId, pageId },
      metadata: {
        category: 'campaign_action',
        noun: 'quiz',
        target: 'form',
        verb: 'submitted',
      },
    });
  }

  return (
    <div className="quiz">
      <div className="quiz__introduction">
        <h1 className="quiz__subtitle">
          {fields.subtitle || LegacyQuiz.defaultProps.fields.subtitle}
        </h1>
        <h2 className="quiz__title">{fields.title}</h2>
        {introduction}
      </div>

      {questions}

      {quizError}

      {submitConclusion}

      {fields.resultActions && selectedResult
        ? showResultingAction()
        : shareConclusion}
    </div>
  );
};

LegacyQuiz.propTypes = {
  campaignId: PropTypes.string,
  completeQuiz: PropTypes.func.isRequired,
  data: PropTypes.shape({
    shouldSeeResult: PropTypes.bool,
    selectedResult: PropTypes.string,
    questions: PropTypes.object,
    error: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    comparison: PropTypes.string,
    callToAction: PropTypes.string,
    questions: PropTypes.array,
    results: PropTypes.array,
    resultActions: PropTypes.bool,
  }),
  pageId: PropTypes.string,
  pickQuizAnswer: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
};

LegacyQuiz.defaultProps = {
  campaignId: null,
  data: {
    shouldSeeResult: false,
    selectedResult: null,
    questions: {},
    error: null,
  },
  fields: {
    subtitle: 'Quiz',
    introduction: '',
    questions: [],
    results: [],
    conclusion: '',
    comparison: '',
    callToAction: '',
    resultActions: false,
  },
  pageId: null,
  submitButtonText: 'get results',
};

export default LegacyQuiz;
