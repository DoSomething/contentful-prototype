import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import Question from './Question';
import Markdown from '../Markdown';
import Conclusion from './Conclusion';
import Share from '../utilities/Share/Share';
import ContentfulEntry from '../ContentfulEntry';

import './legacy-quiz.scss';

const LegacyQuiz = props => {
  const {
    id,
    fields,
    data,
    completeQuiz,
    pickQuizAnswer,
    trackEvent,
    submitButtonText,
  } = props;
  const { error, shouldSeeResult, selectedResult } = data;

  const introduction = shouldSeeResult ? null : (
    <Markdown className="quiz__description">{fields.introduction}</Markdown>
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
      <button onClick={() => completeQuiz(id)} className="button quiz__submit">
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
    trackEvent('converted on quiz', {
      responses: data.questions,
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
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    comparison: PropTypes.string,
    callToAction: PropTypes.string,
    questions: PropTypes.array,
  }).isRequired,
  data: PropTypes.shape({
    shouldSeeResult: PropTypes.bool,
    questions: PropTypes.object,
    error: PropTypes.string,
  }).isRequired,
  completeQuiz: PropTypes.func.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
};

LegacyQuiz.defaultProps = {
  data: {
    shouldSeeResult: false,
    questions: {},
    error: null,
  },
  fields: {
    subtitle: 'Quiz',
    introduction: '',
    questions: [],
    conclusion: '',
    comparison: '',
    callToAction: '',
  },
  submitButtonText: 'get results',
};

export default LegacyQuiz;
